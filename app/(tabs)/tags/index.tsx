import {
  TagListResponseDto_TagListItemDto,
  UniRefund_TagService_Tags_TagListItemDto,
} from '@ayasofyazilim/saas/TagService';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React, { Dispatch, useCallback, useEffect, useState } from 'react';

import { RefreshControl, ScrollView, View } from 'react-native';
import { getTags } from '~/actions/unirefund/TagService/actions';
import { Text } from '~/components/ui/text';
import { useStore } from '~/store/store';
import { Store } from '~/store/types';

function fetchTags({
  setTags,
  setRefreshing,
  activeMerchant,
}: {
  setTags: Dispatch<React.SetStateAction<TagListResponseDto_TagListItemDto | null>>;
  setRefreshing: Dispatch<React.SetStateAction<boolean>>;
  activeMerchant: Store['activeMerchant'];
}) {
  setRefreshing(true);
  void getTags(activeMerchant ? { merchantIds: [activeMerchant.id] } : {}).then((res) => {
    setTags(res || null);
    setRefreshing(false);
  });
}

export default function Tags() {
  const { activeMerchant } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [tags, setTags] = useState<TagListResponseDto_TagListItemDto | null>(null);

  useEffect(() => {
    fetchTags({ setTags, setRefreshing, activeMerchant });
  }, []);

  const onRefresh = useCallback(() => {
    fetchTags({ setTags, setRefreshing, activeMerchant });
  }, []);
  return (
    <ScrollView
      className="flex-1"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {!tags || !tags.items || !tags.items[0] ? (
        refreshing ? null : (
          <Text>No tags</Text>
        )
      ) : (
        <TagList items={tags.items || []} />
      )}
    </ScrollView>
  );
}
function TagList({ items }: { items: UniRefund_TagService_Tags_TagListItemDto[] }) {
  return (
    <View className="flex flex-col gap-4 p-4">
      {items.map((tag) => {
        return (
          <Link
            key={tag.id}
            href={{
              pathname: '/tags/details/[id]',
              params: { id: tag.tagNumber },
            }}>
            <View className="flex flex-row flex-nowrap items-center gap-4 rounded-md border border-border p-4">
              <View className="flex-1 flex-shrink-0 ">
                <View className="p-0">
                  <Text>{tag.tagNumber}</Text>
                </View>
                <View className="p-0">
                  <Text>{tag.issueDate}</Text>
                </View>
              </View>
              <ChevronRight />
            </View>
          </Link>
        );
      })}
    </View>
  );
}
