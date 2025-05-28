import { Stack } from 'expo-router';

import EditProfileForm from '~/app/forms/profile/edit-profile';

function EditProfile() {
  return (
    <>
      <Stack.Screen
        options={{ title: 'Profilini Tamamla', headerShown: true, headerBackTitle: 'Geri' }}
      />
      <EditProfileForm />
    </>
  );
}
export default EditProfile;
