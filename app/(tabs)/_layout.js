import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {

  return (
    <NativeTabs>

      <NativeTabs.Trigger name="index" options={{ title: 'Home', headerShown: false }}>
        <Label>Home</Label>
        <Icon sf={"house.fill"} drawable='ic_media_next'/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile" options={{ title: 'Profile', headerShown: false }}>
        <Label>Profile</Label>
        <Icon sf={"person.fill"} drawable='alert_dark_frame'/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history" options={{ title: 'History', headerShown: false }}>
        <Label>History</Label>
        <Icon sf={"clock.fill"} drawable=""/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="upload" options={{ title: 'Upload', headerShown: false }}>
        <Label>Upload</Label>
        <Icon sf={"plus.app"} drawable='ic_input_add'/>
      </NativeTabs.Trigger>


    </NativeTabs>
    
  );
}
