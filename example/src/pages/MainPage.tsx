import React from 'react';

import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <>
      <Link to="/remote">remote</Link>

      <Link to="/embeded">embeded</Link>
    </>
  );
}
