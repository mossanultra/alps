'use client'
// This component is to initialize Firebase Anaytics (in a client component).
// And it is supposed to be used in src/app/layout.tsx.
//
// You can still send an event without it.
// And the user will be tracked as soon as they send an event.
// However, active users (in real time) will not be tracked without it before they send an event.
import { analytics } from '../../../firebase'

analytics

const FirebaseAnalytics = () => {
  // dummy JSX component
  return <div></div>
}

export default FirebaseAnalytics
