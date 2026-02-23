import { defineStore } from 'pinia'
import { openDB } from 'idb'

const DB_NAME = 'travel-chat-db'
const STORE_NAME = 'messages'
const DB_VERSION = 1

interface ChatMessage {
    type: 'user' | 'ai' | 'function'
    content: string
    timestamp?: number
}

async function initDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'timestamp' })
            }
        }
    })
}

export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [] as ChatMessage[]
    }),

    actions: {
        async init() {
            const db = await initDB()
            const allMessages = await db.getAll(STORE_NAME)
            this.messages = allMessages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
        },

        async addMessage(message: ChatMessage) {
            const messageWithTimestamp = {
                ...message,
                timestamp: Date.now()
            }

            if (message.type === 'user') {
                this.messages.push(messageWithTimestamp)
            } else if (message.type === 'ai') {
                const lastMessage = this.messages[this.messages.length - 1]
                if (lastMessage && lastMessage.type === 'ai') {
                    lastMessage.content += message.content
                } else {
                    this.messages.push(messageWithTimestamp)
                }
            } else if (message.type === 'function') {
                this.messages.push(messageWithTimestamp)
            }

            await this.saveToDB(messageWithTimestamp)
        },

        async saveToDB(message: ChatMessage) {
            const db = await initDB()
            await db.put(STORE_NAME, message)
        },

        async clearMessages() {
            const db = await initDB()
            await db.clear(STORE_NAME)
            this.messages = []
        }
    }
})
