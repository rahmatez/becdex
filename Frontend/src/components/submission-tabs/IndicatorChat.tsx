import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Send, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

interface IndicatorChatProps {
  submissionId: string;
  indicatorId: number;
}

export function IndicatorChat({ submissionId, indicatorId }: IndicatorChatProps) {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const queryKey = ['indicator-comments', submissionId, indicatorId];

  const { data: commentsData, isLoading } = useQuery({
    queryKey,
    queryFn: async () => (await api.get(`/submissions/${submissionId}/indicators/${indicatorId}/comments`)).data,
  });

  const comments = commentsData?.data || [];

  const addCommentMutation = useMutation({
    mutationFn: async (msg: string) => {
      return await api.post(`/submissions/${submissionId}/indicators/${indicatorId}/comments`, { message: msg });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setMessage('');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    addCommentMutation.mutate(message);
  };

  return (
    <div className="flex flex-col h-[350px] border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl overflow-hidden mt-4 shadow-inner">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="text-xs text-slate-500 text-center mt-4">Memuat pesan...</div>
        ) : comments.length === 0 ? (
          <div className="text-xs text-slate-500 text-center mt-4">Belum ada diskusi.</div>
        ) : (
          comments.map((c: any) => {
            const isMe = c.user_id === user?.id;
            return (
              <div key={c.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 rounded-tl-sm shadow-sm'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold ${isMe ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {c.user?.name || 'User'}
                    </span>
                    <span className={`text-[9px] ${isMe ? 'text-blue-200/80' : 'text-slate-400/80'}`}>
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed break-words">{c.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200/80 dark:border-slate-700">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            disabled={addCommentMutation.isPending}
            className="flex-1 px-3 py-2 text-xs border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl focus:outline-hidden focus:border-blue-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={!message.trim() || addCommentMutation.isPending}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
          >
            <Send size={14} className={addCommentMutation.isPending ? 'animate-pulse' : ''} />
          </button>
        </form>
      </div>
    </div>
  );
}
