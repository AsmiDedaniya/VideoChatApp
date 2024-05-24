import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'
import "@elastic/eui/dist/eui_theme_light.css"
import Login from './pages/Login';
import { Route,Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import '@elastic/eui/dist/eui_theme_dark.css'
import { useAppDispatch, useAppSelector } from './app/hook';
import ThemeSelector from './components/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';
import OneOnOneMettinf from './pages/OneOnOneMettinf';
import { setToasts } from './app/slices/MeetingSlice';
import VideoConference from './pages/VideoConference';
import MyMeetings from './pages/MyMeetings';
import Meeting from './pages/Meeting';
import JoinMeeting from './pages/JoinMeeting';
function App() {
  const dispatch=useAppDispatch()
  const isDarkTheme=useAppSelector((zoom)=>zoom.auth.isDarkTheme);
  const toasts=useAppSelector(zzoom=>zzoom.meeting.toasts)
  const[theme,setTheme]=useState<EuiThemeColorMode>("light");
const[isInitialTheme,setIsInitialTheme]=useState(true);
  useEffect(()=>{
    const theme=localStorage.getItem("zoom-theme");
    if(theme){
      setTheme(theme as EuiThemeColorMode)
    }else
    {
      localStorage.setItem("zoom-theme","light");
    }
  },[]);

useEffect(()=>{
  if(isInitialTheme){
    setIsInitialTheme(false);
  }
    else
  {
    window.location.reload()
  }
},[isDarkTheme]);
  const overrides={
    colors:{
      LIGHT:{primary:"#0b5cff"},
      DARK:{primary:"#0b5cff"},
    }
  }

  const removeToast=(removeToast:{id:string})=>{
    dispatch(
      setToasts(
        toasts.filter((toast:{id:string})=>
        toast.id!==removeToast.id)
      )
    )
  }

  return (
    <ThemeSelector>
 <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
    <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/" element={<Dashboard/>}/>
     <Route path="*" element={<Dashboard/>}/>
     <Route path="/create" element={<CreateMeeting/>} />
     <Route path="/create1on1" element={<OneOnOneMettinf/>}/>
     <Route path="/videoconference" element={<VideoConference/>}/>
     <Route path="/mymeetings" element={<MyMeetings/>}/>
     <Route path="/meetings" element={<Meeting/>}/>
     <Route path="/join/:id" element={<JoinMeeting/>}/>
    </Routes>
    <EuiGlobalToastList
    toasts={toasts}
    dismissToast={removeToast}
    toastLifeTimeMs={5000}/>
    </EuiThemeProvider>
       </EuiProvider>
    </ThemeSelector>
   
  );
}

export default App;
