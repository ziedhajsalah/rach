import React from 'react';

export const NameForm = ({
  name,
  setFormName
}: {
  name: string;
  setFormName: (e: React.FormEvent<HTMLInputElement>) => void;
}) => (
  <div className="responsive-margin responsive-padding">
    <label htmlFor="name">form name</label>
    <input id="name" value={name} onChange={setFormName} />
  </div>
);
