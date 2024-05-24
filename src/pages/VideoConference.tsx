
import React, { useState } from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm, EuiSpacer, EuiSwitch ,EuiFormRow} from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUsersField from '../components/FormComponents/MeetingUsersField'
import useFetchUsers from '../hooks/useFetchUsers'
import useAuth from '../hooks/useAuth'
import moment from 'moment'
import MeetingDateField from '../components/FormComponents/MeetingDateField'
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons'
import { FieldErrorType } from '../utils/Types'
import { addDoc } from 'firebase/firestore'
import { meetingsRef } from '../utils/FirebaseConfig'
import { generateMeetingID } from '../utils/generateMeetingId'
import { useAppSelector } from '../app/hook'
import { UserType } from '../utils/Types'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'
import MeetingMaximumUsersField from '../components/FormComponents/MeetingMaximumUserField'
const VideoConference = () => {
    useAuth()
    const navigate=useNavigate();
    const[users]=useFetchUsers()
    const[createToast]=useToast();
    const uid=useAppSelector((zoom)=>zoom.auth.userInfo?.uid)
    const[meetingName,setMeetingName]=useState("");
    const[selectedUsers,setSelectedUsers]=useState<Array<UserType>>([])
     const[startDate,setStartDate]=useState(moment())
  const[size,setSize]=useState(1);
  const[anyonecanjoin,setAnyoneCanJoin]=useState(false);
      const[showErrors,setShowErrors]=useState<{
        meetingName:FieldErrorType;
        meetingUser:FieldErrorType;
      }>({
        meetingName:{
            show:false,
            message:[],
        },
            meetingUser:{
                show:false,
                message:[]
            }
        
      })
    const onUserChange=(selectedOptions:any)=>{
           setSelectedUsers(selectedOptions)
    }

    const createMeeting=async()=>{
          if(!validateForm() && meetingName.length>0 && selectedUsers.length>0){
            const meetingId=generateMeetingID();
            await addDoc(meetingsRef,{
                createdBy:uid,
                meetingId,
                meetingName,
                meetingType:anyonecanjoin?"anyyone-can-join":"video-conference",
                invitedUsers:anyonecanjoin?[]:selectedUsers.map((user:UserType)=>user.uid),
                maxUsers: anyonecanjoin?100:size,
                meetingDate:startDate.format("L"),
                status:true,
            })
            createToast({
                title:anyonecanjoin?"Anyone can join meeting created successfully":"video Conference created successfully",
                type:"success"
            })
            navigate("/")
          }
          else{
            validateForm()
          }
    }

    const validateForm=()=>{
        let errors=false;
        const clonedShowErrors={...showErrors}
        if(!meetingName.length){
            clonedShowErrors.meetingName.show=true;
            clonedShowErrors.meetingName.message=["Please Enter Meeting Name"];
        }
        else
        {
            clonedShowErrors.meetingName.show=false;
            clonedShowErrors.meetingName.message=[];
        }
        if(!selectedUsers.length){
            clonedShowErrors.meetingUser.show=true;
            clonedShowErrors.meetingUser.message=["Please selecte user"]
        }
        else{
            clonedShowErrors.meetingUser.show=false;
            clonedShowErrors.meetingUser.message=[]
        }
        setShowErrors(clonedShowErrors);
        return errors;
    }

  return (
    <div
    style={{display:"flex",
        height:"100vh",
        flexDirection:"column",
    }}>
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiForm>
                <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
                    <EuiSwitch
                    showLabel={false}
                    label="Anyone can Join"
                    checked={anyonecanjoin}
                    onChange={(e)=>setAnyoneCanJoin(e.target.checked)}
                    compressed/>
                    
                </EuiFormRow>
                <MeetingNameField
                label="Meeting Name"
                placeholder="Meeting Name"
                value={meetingName}
                setMeetingName={setMeetingName}
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}/>
                {
                    anyonecanjoin?(
                        <MeetingMaximumUsersField
                        value={size}
                        setSize={setSize}/>
                    ):(
                        <MeetingUsersField
                        label="Invite User"
                        options={users}
                        onChange={onUserChange}
                        selectedOptions={selectedUsers}
                        singleSelection={false}
                        isClearable={false}
                        placeholder='Select a user'
                        isInvalid={showErrors.meetingUser.show}
                        error={showErrors.meetingUser.message}
                        />
                    )
                }
       
                <MeetingDateField selected={startDate} setStartDate={setStartDate}/>
                <EuiSpacer/>
                <CreateMeetingButtons createMeeting={createMeeting}/>
            </EuiForm>

        </EuiFlexGroup>
      
    </div>
  )
}

export default VideoConference
