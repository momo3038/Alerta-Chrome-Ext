import React from 'react';

export function ConnectionStatusInfo(props: {
  isSuccess: boolean;
  error?: { status: number; statusText: string };
}) {
  return (
    <p>
      Connection status :
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          style={{ margin: '5px' }}
          fill="currentColor"
          className={`bi bi-check-circle-fill text-${props.isSuccess ? 'success' : 'danger'} ? `}
          viewBox="0 0 16 16"
        >
          {props.isSuccess ? (
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          ) : (
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          )}
        </svg>
        {props.isSuccess ? (
          <span> Looks good ! Alerts can be retrieved from Alerta API</span>
        ) : (
          <span>
            Oups, we're not able to get alerts from Alerta API
            {props.error
              ? ` (${props.error.status} - ${props.error.statusText})`
              : ' (You need to allow the extension to call Alerta API. Please fulfill the form then Save preferences)'}
          </span>
        )}
      </span>
    </p>
  );
}
