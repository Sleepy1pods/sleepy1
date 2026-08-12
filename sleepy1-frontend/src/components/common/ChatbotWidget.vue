<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    <!-- Chat Window -->
    <Transition name="fade-slide">
      <div 
        v-if="isOpen" 
        class="mb-4 w-80 sm:w-96 bg-ink-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style="height: 500px; max-height: calc(100vh - 120px);"
      >
        <!-- Header -->
        <div class="bg-brand-600 px-4 py-3 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <h3 class="text-white font-medium">Sleepy1 Assistant</h3>
          </div>
          <button @click="isOpen = false" class="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/20svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-ink-950" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div 
              class="max-w-[80%] rounded-2xl px-4 py-2 text-sm"
              :class="msg.role === 'user' ? 'bg-brand-600 text-white rounded-br-none' : 'bg-ink-900 border border-white/10 text-white/90 rounded-bl-none'"
            >
              <p v-if="msg.role === 'user'" class="whitespace-pre-wrap">{{ msg.content }}</p>
              <div v-else class="markdown-content" v-html="formatMessage(msg.content)"></div>
            </div>
          </div>

          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-ink-900 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
              <div class="flex space-x-1.5">
                <div class="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-3 bg-ink-900 border-t border-white/10">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input 
              v-model="newMessage"
              type="text" 
              placeholder="Ask me anything..." 
              class="flex-1 bg-ink-950 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-600 transition-colors"
              :disabled="isLoading"
            />
            <button 
              type="submit" 
              class="bg-brand-600 hover:bg-brand-700 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50"
              :disabled="isLoading || !newMessage.trim()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Floating Button -->
    <button 
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
    >
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const formatMessage = (content: string) => {
  return DOMPurify.sanitize(marked.parse(content, { async: false }) as string)
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const isOpen = ref(false)
const isLoading = ref(false)
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: 'Hi! I am the Sleepy1 assistant. How can I help you find a pod today?'
  }
])

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  const text = newMessage.value.trim()
  if (!text) return

  // Add user message
  messages.value.push({
    role: 'user',
    content: text
  })
  
  newMessage.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    
    // We pass the conversation history as well
    const historyPayload = messages.value.slice(0, -1)
    
    const response = await fetch(`${API_URL}/chatbot/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: historyPayload
      })
    })

    const data = await response.json()
    
    if (data.success) {
      const msg: Message = {
        role: 'assistant',
        content: ''
      }
      messages.value.push(msg)
      const msgIndex = messages.value.length - 1
      isLoading.value = false // Stop the loading animation immediately

      const text = data.response
      let i = 0
      // Typing speed: 10-20ms looks good
      const typeSpeed = 15
      
      const typeNextChar = () => {
        if (i < text.length) {
          // Append next character directly to the reactive array element
          messages.value[msgIndex].content += text.charAt(i)
          i++
          // Occasionally scroll down to follow the text
          if (i % 20 === 0) scrollToBottom()
          setTimeout(typeNextChar, typeSpeed)
        } else {
          scrollToBottom()
        }
      }
      typeNextChar()
    } else {
      throw new Error(data.message || 'Failed to fetch response')
    }
  } catch (error) {
    console.error('Chat error:', error)
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, I am having trouble connecting right now. Please try again later.'
    })
    isLoading.value = false
  } finally {
    scrollToBottom()
  }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

:deep(.markdown-content) {
  @apply space-y-3;
}
:deep(.markdown-content p) {
  @apply whitespace-pre-wrap leading-relaxed;
}
:deep(.markdown-content ul) {
  @apply list-disc list-inside space-y-1;
}
:deep(.markdown-content ol) {
  @apply list-decimal list-inside space-y-1;
}
:deep(.markdown-content li) {
  @apply ml-1;
}
:deep(.markdown-content strong) {
  @apply font-semibold text-white;
}
:deep(.markdown-content em) {
  @apply italic;
}
:deep(.markdown-content a) {
  @apply text-brand-400 underline hover:text-brand-300;
}
</style>
