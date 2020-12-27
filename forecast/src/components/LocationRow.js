import React from "react";

export const LocationRow = props => (
  <tr key={props.location.name}>
    <td>{props.location.name}</td>
    <td>
      <button
        // onClick={() => props.toggleTask(props.task)}
      />
    </td>
  </tr>
);