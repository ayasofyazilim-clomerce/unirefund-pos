import { Stack } from 'expo-router';
import EditProfileForm from '~/app/forms/profile/edit-profile';

function EditProfile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Hesap Ayarları' }} />
      <EditProfileForm />
    </>
  );
}

export default EditProfile;
