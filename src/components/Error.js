import React, { useState } from "react";

export const Error = ({ mensaje }) => {
  const [error, setError] = useState(false);

  return (
    <div className="alert alert-primary d-flex align-items-center">
      {mensaje}{" "}
    </div>
  );
};
