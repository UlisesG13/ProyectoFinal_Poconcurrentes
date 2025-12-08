import { apiClient } from './apiClient.js';

export async function syncGroup(grupoId, createIfMissing = false, concurrencyLimit = 5) {
  return apiClient.post('/sync/group', {
    grupo_id: grupoId,
    createIfMissing: createIfMissing,
    concurrencyLimit: concurrencyLimit
  });
}
