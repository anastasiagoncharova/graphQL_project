import React from 'react';
import { Button } from './Button';

interface TableProps<T> {
  columns: Record<string, (row: T) => React.ReactNode>;
  data: T[];
  actions?: Record<string, (row: T) => void>;
}

export const Table = <T,>({ columns, data, actions }: TableProps<T>) => {
  return (
    <table className='striped'>
      <thead>
        <tr>
          {Object.keys(columns).map((col) => (
            <th key={col}>{col}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.entries(columns).map(([colKey, render]) => (
              <td key={colKey}>{render(row)}</td>
            ))}
            {actions && (
              <td>
                {Object.entries(actions).map(
                  ([actionLabel, actionCallback]) => (
                    <Button
                      key={actionLabel}
                      label={actionLabel}
                      onClick={() => actionCallback(row)}
                      className={
                        actionLabel === 'Delete'
                          ? 'red lighten-1'
                          : 'blue lighten-1'
                      }
                    />
                  )
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
