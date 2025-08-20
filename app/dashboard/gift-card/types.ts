import * as React from 'react';

export interface GiftCardDesign {
  id: string;
  name: string;
  icon: React.ElementType;
  primaryColor: string;
  secondaryColor: string;
  pattern: React.ReactElement;
}
