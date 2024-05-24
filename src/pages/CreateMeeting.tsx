import React from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { EuiFlexGroup, EuiFlexItem,EuiCard,EuiImage } from '@elastic/eui';
import meeting1 from "../assets/meeting1.png"
import meeting2 from "../assets/meeting2.png"
import { useNavigate } from 'react-router-dom';
const CreateMeeting = () => {
    useAuth();
    const navigate=useNavigate();
  return (
    <div style={{display:"flex",
    height:"100vh",
    flexDirection:"column"
   }}>
      <Header/>
      <EuiFlexGroup justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}>
        <EuiFlexItem>
        <EuiCard
              icon={<EuiImage src={meeting1} alt="icon" size="100%" />}
              title={`Create 1 On 1 Meeting`}
              description="Create a personal single person metting"
              onClick={() => navigate("/create1on1")}
              paddingSize="xl"
            />
        </EuiFlexItem>
        <EuiFlexItem>
        <EuiCard
              icon={<EuiImage src={meeting2} alt="icon" size="100%" />}
              title={`create video conference`}
              description="Invite multiple person to metting"
              onClick={() => navigate("/videoconference")}
              paddingSize="xl"
            />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting
