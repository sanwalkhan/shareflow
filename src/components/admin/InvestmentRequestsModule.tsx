// components/admin/InvestmentRequestsModule.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, RefreshControl, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../../utils/api';
import { io } from 'socket.io-client';

interface InvestmentRequest {
  _id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  adminNotes?: string;
  shareholder: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    investment: number;
    sharePercentage: number;
  };
  approvedBy?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const InvestmentRequestsModule: React.FC = () => {
  const { user, token } = useAuth();
  const [requests, setRequests] = useState<InvestmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    fetchRequests();
    initializeSocket();
    
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const initializeSocket = () => {
    const newSocket = io(process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000', {
      auth: { token },
    });
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join-company', user?.company?.id);
    });

    newSocket.on('investment:request_created', (data) => {
      Alert.alert('New Investment Request', data.message);
      fetchRequests();
    });

    setSocket(newSocket);
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/investment-requests/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      Alert.alert('Error', 'Failed to load investment requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const handleApprove = async (requestId: string) => {
    try {
      const response = await api.put(`/investment-requests/approve/${requestId}`, {
        adminNotes: 'Investment approved by admin',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Investment request approved');
        fetchRequests();
      }
    } catch (error: any) {
      console.error('Error approving request:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to approve request');
    }
  };

  const handleReject = async (requestId: string) => {
    Alert.alert(
      'Reject Investment Request',
      'Are you sure you want to reject this investment request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await api.put(`/investment-requests/reject/${requestId}`, {
                adminNotes: 'Investment request rejected by admin',
              }, {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (response.data.success) {
                Alert.alert('Success', 'Investment request rejected');
                fetchRequests();
              }
            } catch (error: any) {
              console.error('Error rejecting request:', error);
              Alert.alert('Error', error.response?.data?.message || 'Failed to reject request');
            }
          },
        },
      ]
    );
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Loading investment requests...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Investment Requests</Text>
        <Text className="text-gray-600 mt-1">Manage shareholder investment requests</Text>
      </View>

      {/* Filter Tabs */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row space-x-2">
          {[
            { key: 'all', label: 'All', count: requests.length },
            { key: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
            { key: 'approved', label: 'Approved', count: requests.filter(r => r.status === 'approved').length },
            { key: 'rejected', label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg ${
                filter === tab.key ? 'bg-blue-600' : 'bg-gray-100'
              }`}
            >
              <Text className={`font-medium ${
                filter === tab.key ? 'text-white' : 'text-gray-700'
              }`}>
                {tab.label} ({tab.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Requests List */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-6">
          {filteredRequests.length === 0 ? (
            <View className="bg-white rounded-xl p-8 items-center">
              <Text className="text-gray-500 text-lg">No investment requests found</Text>
            </View>
          ) : (
            <View className="space-y-4">
              {filteredRequests.map((request) => (
                <View key={request._id} className="bg-white rounded-xl p-6 shadow-sm">
                  <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1">
                      <Text className="text-xl font-semibold text-gray-900">
                        {formatCurrency(request.amount)}
                      </Text>
                      <Text className="text-gray-600">
                        {request.shareholder.firstName} {request.shareholder.lastName}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {request.shareholder.email}
                      </Text>
                    </View>
                    
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: getStatusColor(request.status) + '20' }}
                    >
                      <Text
                        className="font-medium capitalize"
                        style={{ color: getStatusColor(request.status) }}
                      >
                        {request.status}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-700 mb-4">{request.reason}</Text>

                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-sm text-gray-500">
                      Requested: {formatDate(request.createdAt)}
                    </Text>
                    {request.status !== 'pending' && (
                      <Text className="text-sm text-gray-500">
                        {request.status === 'approved' ? 'Approved' : 'Rejected'}: {
                          formatDate(request.approvedAt || request.rejectedAt || '')
                        }
                      </Text>
                    )}
                  </View>

                  {request.adminNotes && (
                    <View className="bg-gray-50 rounded-lg p-3 mb-4">
                      <Text className="text-sm text-gray-600">
                        <Text className="font-medium">Admin Notes:</Text> {request.adminNotes}
                      </Text>
                    </View>
                  )}

                  {request.status === 'pending' && (
                    <View className="flex-row space-x-3">
                      <TouchableOpacity
                        onPress={() => handleApprove(request._id)}
                        className="flex-1 bg-green-600 rounded-lg py-3"
                      >
                        <Text className="text-white text-center font-semibold">
                          Approve
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={() => handleReject(request._id)}
                        className="flex-1 bg-red-600 rounded-lg py-3"
                      >
                        <Text className="text-white text-center font-semibold">
                          Reject
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {request.status !== 'pending' && request.approvedBy && (
                    <Text className="text-sm text-gray-500">
                      Processed by: {request.approvedBy.firstName} {request.approvedBy.lastName}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default InvestmentRequestsModule;
