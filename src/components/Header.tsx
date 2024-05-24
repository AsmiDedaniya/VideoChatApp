import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { changeTheme } from '../app/slices/AurhSlice';
import { getCreateMeetingBreadCrumbs, getMeetingsBreadCrumbs, getMyMeetingsBreadCrumbs, getOneonOneMeetingBreadCrumbs, getVideoConferenceBreadCrumbs } from '../utils/breadCrumbs';
const Header = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const username=useAppSelector((zoom)=>zoom.auth.userInfo?.name)
    const[breadCrumbs,setBreadCrubs]=useState([{text:"Dashboard"}])
    const[isResponsive,setIsResponsive]=useState(false);
    const isDarkTheme=useAppSelector((zoom)=>zoom.auth.isDarkTheme);
    const dispatch=useDispatch()
    const logout=()=>{
    signOut(firebaseAuth)
    }

    useEffect(()=>{
        const{pathname}=location;
        if(pathname==="/create"){
            setBreadCrubs(getCreateMeetingBreadCrumbs(navigate));
        }
        else if(pathname==="/create1on1"){
            setBreadCrubs(getOneonOneMeetingBreadCrumbs(navigate))
        }
        else if(pathname==='/videoconference'){
            setBreadCrubs(getVideoConferenceBreadCrumbs(navigate));
        }
        else if(pathname==='/mymeetings'){
            setBreadCrubs(getMyMeetingsBreadCrumbs(navigate));
        }
        else if(pathname==='/meetings'){
            setBreadCrubs(getMeetingsBreadCrumbs(navigate));
        }
    },[location,navigate])
    const invertTheme=()=>{
        const theme=localStorage.getItem("zoom-theme");
        localStorage.setItem("zoom-theme",theme==="light"?"dark":"light")
        dispatch(changeTheme({isDarkTheme:!isDarkTheme}))
    }

    const section=[{
        items:[
            <Link to="/">
                <EuiText>
                    <h2 style={{padding:"0 1vw"}}>
                        <EuiTextColor color="#0b5cff">MeetApp</EuiTextColor>
                    </h2>
                </EuiText>
            </Link>
        ]
    }
    ,{
        items:[
            <>
            {
                username?(
                    <EuiText>
                       <h3>
                        <EuiTextColor color='white'>Hello,</EuiTextColor>
                        <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
                       </h3>
                    </EuiText>
                ):null
            }
            </>
        ]
    },
{
    items:[
        <EuiFlexGroup
        justifyContent='center'
        alignItems='center'
        direction="row"
        style={{gap:"2vw"}}
        >
             <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                {
                    isDarkTheme?(
                        <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="sun"
                        color='warning'
                        display="fill"
                        size="s"
                        aria-label='invert-theme-button'>
            
                        </EuiButtonIcon>
                    ):(
                        <EuiButtonIcon
                        onClick={invertTheme}
                        iconType="moon"
                        color="text"
                        display="fill"
                        size="s"
                        aria-label='invert-theme-button'>
            
                        </EuiButtonIcon>
                    )
                }
          
        
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
            <EuiButtonIcon
            onClick={logout}
            iconType="lock"
            display="fill"
            size="s"
            aria-label='logout-button'>

            </EuiButtonIcon>
        </EuiFlexItem>

        </EuiFlexGroup>
    ]
}
];
    const responsiveSection=[
        {
            items:[
                <Link to="/">
                    <EuiText>
                        <h2 style={{padding:"0 1vw"}}>
                            <EuiTextColor color="#0b5cff">MeetApp</EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>
            ]
        },
        {
            items:[
                <EuiFlexGroup
                justifyContent='center'
                alignItems='center'
                direction="row"
                style={{gap:"2vw"}}
                >
                     <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                        {
                            isDarkTheme?(
                                <EuiButtonIcon
                                onClick={invertTheme}
                                iconType="sun"
                                color='warning'
                                display="fill"
                                size="s"
                                aria-label='invert-theme-button'>
                    
                                </EuiButtonIcon>
                            ):(
                                <EuiButtonIcon
                                onClick={invertTheme}
                                iconType="moon"
                                color="text"
                                display="fill"
                                size="s"
                                aria-label='invert-theme-button'>
                    
                                </EuiButtonIcon>
                            )
                        }
                  
                
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    <EuiButtonIcon
                    onClick={logout}
                    iconType="lock"
                    display="fill"
                    size="s"
                    aria-label='logout-button'>
        
                    </EuiButtonIcon>
                </EuiFlexItem>
        
                </EuiFlexGroup>
            ]
        }
    ];

    useEffect(()=>{
        if(window.innerWidth<480)
            setIsResponsive(true);
    },[])
  return (
    <>
    <EuiHeader
    style={{minHeight:"8vh"}}
    theme="dark"
    sections={isResponsive ? responsiveSection:section}/>
    <EuiHeader
    style={{minHeight:"8vh"}}
    sections={[{breadcrumbs:breadCrumbs}]}/>

    </>
  )
}

export default Header
