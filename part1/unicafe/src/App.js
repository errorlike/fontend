import { useState } from 'react';

const Button = (props) =>
  <div>
    <button onClick={props.onClick}>
      {props.text}
    </button>
  </div>;

const StatisticLine = ({ text, value }) =>
  <div>
    {text} {value}
  </div>;
const Statistics = ({ title, good, neutral, bad }) => {

  const all = good + neutral + bad;
  const average = good * 1 + neutral * 0 + bad * (-1);
  const positive = all === 0 ? 0 : good / all * 100 + "%";
  if (good === 0 && neutral === 0 & bad === 0) {
    return <div><p>No feedback given</p></div>;
  }
  return (
    <div>
      <h2>{title}</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics title="statistics" good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;