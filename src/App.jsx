import { useState } from 'react';
import { Welcome }           from './screens/Welcome';
import { Register }          from './screens/Register';
import { Login }             from './screens/Login';
import { VerifyCode }        from './screens/VerifyCode';
import { Privacy }           from './screens/Privacy';
import { QuestionBlock }     from './screens/QuestionBlock';
import { Results }           from './screens/Results';
import { ProfessionalSearch } from './screens/ProfessionalSearch';
import { B1, DASS, B3 }      from './constants/questions';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export default function App() {
  const [step, setStep]         = useState('welcome');
  const [prevStep, setPrevStep] = useState(null);
  const [userData, setUserData] = useState({ phone: '' });
  const [answers, setAnswers]   = useState({});

  function go(next, back = null) {
    setPrevStep(back ?? step);
    setStep(next);
  }

  function mergeAnswers(patch) {
    setAnswers(prev => ({ ...prev, ...patch }));
  }

  async function saveRespuestas(finalAnswers) {
    try {
      await fetch('/api/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userData.phone, answers: finalAnswers }),
      });
    } catch (err) {
      console.error('No se pudieron guardar las respuestas:', err);
    }
  }

  function reset() {
    setAnswers({});
    setUserData({ phone: '' });
    setStep('welcome');
  }

  if (step === 'welcome') return (
    <Welcome onNext={() => go('register')} />
  );

  if (step === 'register') return (
    <Register
      onNext={phone => {
        setUserData({ phone });
        mergeAnswers({ b1_5: phone });
        DEMO_MODE ? go('privacy', 'register') : go('verify', 'register');
      }}
      onLogin={() => go('login')}
    />
  );

  if (step === 'login') return (
    <Login
      onNext={phone => {
        setUserData({ phone });
        mergeAnswers({ b1_5: phone });
        DEMO_MODE ? go('privacy', 'login') : go('verify', 'login');
      }}
      onRegister={() => go('register')}
    />
  );

  if (step === 'verify') return (
    <VerifyCode
      phone={userData.phone}
      onNext={() => go('privacy', 'register')}
      onBack={() => go(prevStep ?? 'register')}
    />
  );

  if (step === 'privacy') return (
    <Privacy
      onNext={() => go('b1', 'privacy')}
      onBack={() => go(DEMO_MODE ? (prevStep ?? 'register') : 'verify', 'privacy')}
    />
  );

  if (step === 'b1') return (
    <QuestionBlock
      key="b1"
      questions={B1}
      data={answers}
      setData={mergeAnswers}
      blockIndex={1}
      totalBlocks={3}
      pctStart={10}
      pctEnd={35}
      onFinish={() => go('dass', 'b1')}
      onBack={() => go('privacy', 'b1')}
    />
  );

  if (step === 'dass') return (
    <QuestionBlock
      key="dass"
      questions={DASS}
      data={answers}
      setData={mergeAnswers}
      blockIndex={2}
      totalBlocks={3}
      pctStart={35}
      pctEnd={70}
      onFinish={() => go('b3', 'dass')}
      onBack={() => go('b1', 'dass')}
    />
  );

  if (step === 'b3') return (
    <QuestionBlock
      key="b3"
      questions={B3}
      data={answers}
      setData={mergeAnswers}
      blockIndex={3}
      totalBlocks={3}
      pctStart={70}
      pctEnd={100}
      onFinish={() => {
        saveRespuestas(answers);
        go('results', 'b3');
      }}
      onBack={() => go('dass', 'b3')}
    />
  );

  if (step === 'results') return (
    <Results
      data={answers}
      userData={userData}
      onProfessionals={DEMO_MODE ? null : () => go('professionals', 'results')}
      onExit={reset}
    />
  );

  if (step === 'professionals' && !DEMO_MODE) return (
    <ProfessionalSearch
      userData={userData}
      onBack={() => go('results', 'professionals')}
      onExit={reset}
    />
  );

  return null;
}
