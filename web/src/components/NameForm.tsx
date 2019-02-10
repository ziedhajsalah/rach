import React from 'react';

export const NameForm = ({
  name,
  setFormName
}: {
  name: string;
  setFormName: (e: React.FormEvent<HTMLInputElement>) => void;
}) => (
  <div className="row">
    <div className="col-sm-12">
      <div className="card fluid">
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="name">Nom de la formulaire</label>
            <input id="name" value={name} onChange={setFormName} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
