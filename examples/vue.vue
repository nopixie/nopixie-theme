<template>
  <div :class="['user-card', className]">
    <!-- Loading state -->
    <div v-if="loading" class="spinner">
      Loading...
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-message">
      <strong>Error:</strong> {{ error }}
    </div>

    <!-- User content -->
    <div v-else-if="user" class="user-content">
      <div class="user-header">
        <h2>{{ user.name }}</h2>
        <span
          class="status-badge"
          :style="{ backgroundColor: statusColor }"
        >
          {{ user.isActive ? 'Active' : 'Inactive' }}
        </span>
      </div>

      <div class="user-info">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Age:</strong> {{ user.age }}</p>
        <p><strong>Birth Year:</strong> {{ birthYear }}</p>
      </div>

      <div class="user-actions">
        <button
          @click="toggleEdit"
          class="btn-primary"
        >
          {{ isEditing ? 'Cancel' : 'Edit' }}
        </button>

        <button
          v-if="isEditing"
          @click="handleUpdate"
          class="btn-success"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

/**
 * User interface
 */
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

/**
 * Component props
 */
interface Props {
  userId: number;
  className?: string;
}

/**
 * Component emits
 */
interface Emits {
  (e: 'update', user: User): void;
}

// Props and emits
const props = withDefaults(defineProps<Props>(), {
  className: ''
});

const emit = defineEmits<Emits>();

// State
const user = ref<User | null>(null);
const loading = ref<boolean>(true);
const error = ref<string>('');
const isEditing = ref<boolean>(false);

// Constants
const MAX_NAME_LENGTH = 50;
const STATUS_COLORS = {
  active: 'green',
  inactive: 'red'
};

/**
 * Computed properties
 */
const birthYear = computed((): number => {
  if (!user.value) return 0;
  return new Date().getFullYear() - user.value.age;
});

const statusColor = computed((): string => {
  return user.value?.isActive
    ? STATUS_COLORS.active
    : STATUS_COLORS.inactive;
});

/**
 * Fetch user data
 */
const fetchUser = async (): Promise<void> => {
  try {
    loading.value = true;
    const response = await fetch(`/api/users/${props.userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data: User = await response.json();
    user.value = data;
    error.value = '';
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error';
  } finally {
    loading.value = false;
  }
};

/**
 * Handle user update
 */
const handleUpdate = async (): Promise<void> => {
  if (!user.value) return;

  try {
    const response = await fetch(`/api/users/${props.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user.value)
    });

    if (response.ok) {
      isEditing.value = false;
      emit('update', user.value);
    }
  } catch (err) {
    console.error('Update failed:', err);
  }
};

/**
 * Toggle edit mode
 */
const toggleEdit = (): void => {
  isEditing.value = !isEditing.value;
};

/**
 * Validate email
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Lifecycle hooks
onMounted(() => {
  fetchUser();
});

// Watchers
watch(() => props.userId, () => {
  fetchUser();
});
</script>

<style scoped>
.user-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.user-info {
  margin-bottom: 16px;
}

.user-info p {
  margin: 8px 0;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.btn-primary,
.btn-success {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background-color: #2196f3;
  color: white;
}

.btn-success {
  background-color: #4caf50;
  color: white;
}

.spinner,
.error-message {
  padding: 20px;
  text-align: center;
}

.error-message {
  color: #f44336;
}
</style>
