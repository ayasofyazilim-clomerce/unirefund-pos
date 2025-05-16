import { FlatList, View, Text, ActivityIndicator, RefreshControl } from 'react-native';

import { Stack } from 'expo-router';
import { useNotifications } from '@novu/react-native';

function YourCustomInbox() {
  const { notifications, isLoading, fetchMore, hasMore, refetch, error } = useNotifications();
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <View>
        <ActivityIndicator size="small" color="#2196F3" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View>
      <Text>No updates available</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} colors={['#2196F3']} />
      }
    />
  );
}

function AccountSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Hesap Ayarları' }} />
      <YourCustomInbox />
    </>
  );
}

export default AccountSettings;
