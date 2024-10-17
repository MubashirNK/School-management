import { createDraftSafeSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit'
  
const selectDomain = (state) => state.auth;

 export const selectName = createDraftSafeSelectorCreator([selectDomain],(authState) => authState.name)
 export const selectToken = createDraftSafeSelectorCreator([selectDomain],(authState) => authState.accessToken)
 export const selectEmail = createDraftSafeSelectorCreator([selectDomain],(authState) => authState.email)
 export const selectRole = createDraftSafeSelectorCreator([selectDomain],(authState) => authState.role)