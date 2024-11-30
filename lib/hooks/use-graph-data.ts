import { useState, useEffect } from 'react';

interface GraphData {
  messageRateData: Array<{
    timestamp: number;
    publishRate: number;
    deliveryRate: number;
  }>;
  queuedMessagesData: Array<{
    timestamp: number;
    messages: number;
    messagesReady: number;
    messagesUnacked: number;
  }>;
}

export function useGraphData(): GraphData {
  const [messageRateData, setMessageRateData] = useState<GraphData['messageRateData']>([]);
  const [queuedMessagesData, setQueuedMessagesData] = useState<GraphData['queuedMessagesData']>([]);

  useEffect(() => {
    const updateGraphData = async () => {
      try {
        const response = await fetch('/api/overview');
        const data = await response.json();
        
        const timestamp = Date.now();
        const oneMinuteAgo = timestamp - 60 * 1000;

        // Update message rate data
        setMessageRateData(prev => {
          const newPoint = {
            timestamp,
            publishRate: data.message_stats?.publish_details?.rate || 0,
            deliveryRate: data.message_stats?.deliver_get_details?.rate || 0,
          };
          const filtered = prev.filter(point => point.timestamp > oneMinuteAgo);
          return [...filtered, newPoint];
        });

        // Update queued messages data
        setQueuedMessagesData(prev => {
          const newPoint = {
            timestamp,
            messages: data.queue_totals?.messages || 0,
            messagesReady: data.queue_totals?.messages_ready || 0,
            messagesUnacked: data.queue_totals?.messages_unacknowledged || 0,
          };
          const filtered = prev.filter(point => point.timestamp > oneMinuteAgo);
          return [...filtered, newPoint];
        });
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    // Initial update
    updateGraphData();

    // Set up 5-second interval
    const interval = setInterval(updateGraphData, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    messageRateData,
    queuedMessagesData,
  };
}
