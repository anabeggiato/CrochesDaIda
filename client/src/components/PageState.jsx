import styled from 'styled-components';

export default function PageState({ title, description, action }) {
  return (
    <StateCard>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </StateCard>
  );
}

const StateCard = styled.div`
  width: min(560px, calc(100vw - 2rem));
  margin: calc(100px + 4vh) auto 2rem;
  padding: 1.5rem;
  border-radius: 20px;
  background-color: #fad6ff;
  text-align: center;

  h2 {
    margin-bottom: 0.75rem;
    color: #860194;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    color: #5c5c5c;
    line-height: 1.5;
  }

  button {
    border: none;
    margin-top: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    background-color: #c514db;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background-color: #860194;
  }
`;
