import { ChannelList } from "@/components/channels/channel-list"
import { PageHeader } from "@/components/layout/page-header"
import { ApiError } from "@/components/common/api-error"
import { Suspense } from "react"
import { ChannelListSkeleton } from "@/components/channels/channel-list-skeleton"

export default function ChannelsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Channels"
        description="View and manage RabbitMQ channels."
      />
      <Suspense fallback={<ChannelListSkeleton />}>
        <ApiError>
          <ChannelList />
        </ApiError>
      </Suspense>
    </div>
  )
}
