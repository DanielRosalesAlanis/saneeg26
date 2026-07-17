import { useState, useEffect } from 'react';
import { Welcome }           from './screens/Welcome';
import { Register }          from './screens/Register';
import { Login }             from './screens/Login';
import { VerifyCode }        from './screens/VerifyCode';
import { Privacy }           from './screens/Privacy';
import { QuestionBlock }     from './screens/QuestionBlock';
import { Results }           from './screens/Results';
import { SaveError }         from './screens/SaveError';
import { ProfessionalSearch } from './screens/ProfessionalSearch';
import { B1, DASS, B3 }      from './constants/questions';
import {
  iniciarAplicacion, guardarBloque, obtenerEstado,
  saveProgress, loadProgress, clearProgress,
} from './api/aplicaciones';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const BLOQUE_STEP = { 1: 'b1', 2: 'dass', 3: 'b3' };
const BLOQUE_PREFIX = { 1: 'b1_', 2: 'dass_', 3: 'b3_' };

export default function App() {
  const [step, setStep]         = useState('welcome');
  const [prevStep, setPrevStep] = useState(null);
  const [userData, setUserData] = useState({ phone: '' });
  const [answers, setAnswers]   = useState({});
  const [aplicacionId, setAplicacionId] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [saveError, setSaveError] = useState(null); // { message, retry }
  const [checking, setChecking] = useState(() => Boolean(loadProgress()));

  useEffect(() => {
    const saved = loadProgress();
    if (!saved) return;

    obtenerEstado(saved.aplicacionId)
      .then(estado => {
        if (estado.estado === 'COMPLETA') {
          clearProgress();
          setChecking(false);
          return;
        }
        setAplicacionId(saved.aplicacionId);
        setUserData({ phone: saved.phone });
        setAnswers(prev => ({ ...prev, b1_5: saved.phone }));
        const siguienteBloque = [1, 2, 3].find(b => !estado.bloquesGuardados.includes(b));
        go(BLOQUE_STEP[siguienteBloque] ?? 'results', 'welcome');
        setChecking(false);
      })
      .catch(() => {
        clearProgress();
        setChecking(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(next, back = null) {
    setPrevStep(back ?? step);
    setStep(next);
  }

  function mergeAnswers(patch) {
    setAnswers(prev => ({ ...prev, ...patch }));
  }

  async function withSaveGuard(action) {
    try {
      setSaveError(null);
      await action();
    } catch (err) {
      setSaveError({ message: err.message, retry: action });
    }
  }

  function iniciarYContinuar(phone, nextStep, backStep) {
    setUserData({ phone });
    mergeAnswers({ b1_5: phone });
    withSaveGuard(async () => {
      const { aplicacionId: id } = await iniciarAplicacion(phone);
      setAplicacionId(id);
      saveProgress(id, phone);
      go(nextStep, backStep);
    });
  }

  function guardarBloqueYContinuar(bloque, nextStep) {
    withSaveGuard(async () => {
      const prefix = BLOQUE_PREFIX[bloque];
      const subset = Object.fromEntries(
        Object.entries(answers).filter(([key]) => key.startsWith(prefix))
      );
      const estado = await guardarBloque(aplicacionId, bloque, subset);
      if (estado.resultado) {
        setResultado(estado.resultado);
        clearProgress();
      }
      go(nextStep, BLOQUE_STEP[bloque]);
    });
  }

  function reset() {
    clearProgress();
    setAnswers({});
    setUserData({ phone: '' });
    setAplicacionId(null);
    setResultado(null);
    setStep('welcome');
  }

  if (checking) return null;

  if (saveError) return (
    <SaveError
      message={saveError.message}
      onRetry={() => withSaveGuard(saveError.retry)}
      onBack={() => setSaveError(null)}
    />
  );

  if (step === 'welcome') return (
    <Welcome onNext={() => go('register')} />
  );

  if (step === 'register') return (
    <Register
      onNext={phone => iniciarYContinuar(phone, DEMO_MODE ? 'privacy' : 'verify', 'register')}
      onLogin={() => go('login')}
    />
  );

  if (step === 'login') return (
    <Login
      onNext={phone => iniciarYContinuar(phone, DEMO_MODE ? 'privacy' : 'verify', 'login')}
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
      onFinish={() => guardarBloqueYContinuar(1, 'dass')}
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
      onFinish={() => guardarBloqueYContinuar(2, 'b3')}
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
      onFinish={() => guardarBloqueYContinuar(3, 'results')}
      onBack={() => go('dass', 'b3')}
    />
  );

  if (step === 'results') return (
    <Results
      data={answers}
      userData={userData}
      resultado={resultado}
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
