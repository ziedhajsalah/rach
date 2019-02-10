import React from 'react';

import { Field } from '../App';

export const ShowForm = (props: { fields: Field[]; name: string }) => (
  <>
    <h4>{props.name}</h4>
    {props.fields.map((f) => (
      <div key={f.name}>
        {['text', 'email', 'number'].find((tp) => tp === f.type) && (
          <div>
            {f.name}: <input type={f.type} />
          </div>
        )}
        {f.type === 'textArea' && (
          <div>
            {f.name}: <textarea />
          </div>
        )}
        {f.type === 'multipleChoice' && (
          <div>
            <input type="checkbox" /> {f.name}
          </div>
        )}
        {f.type === 'singleChoice' && (
          <div>
            <input type="radio" /> {f.name}
          </div>
        )}
      </div>
    ))}
  </>
);
