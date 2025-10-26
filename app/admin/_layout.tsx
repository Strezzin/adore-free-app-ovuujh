
import { Stack } from 'expo-router';
import React from 'react';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
