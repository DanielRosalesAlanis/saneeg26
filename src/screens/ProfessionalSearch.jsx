import { useState } from 'react';
import { C } from '../constants/colors';
import { Header } from '../components/Header';
import { MOCK_CENTERS } from '../constants/mockData';
import {
  IconStar, IconSearch, IconMapPin, IconWalk, IconMessage,
  IconInfo, IconCheckCircle, IconChevronDown, IconUser, IconStethoscope,
} from '../components/Icons';

function StarRating({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {stars.map(n => (
        <IconStar key={n} size={13} filled={n <= Math.round(rating)} style={{ color: '#F59E0B' }} />
      ))}
      <span style={{ fontSize: 12, color: C.muted, marginLeft: 4 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function SpecialtyPill({ label }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
      background: C.navyLight, color: C.navy,
      fontSize: 12, fontWeight: 600, marginRight: 6, marginBottom: 4,
    }}>
      {label}
    </span>
  );
}

function AppointmentModal({ center, doctor, slot, userData, onClose }) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,27,42,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 24,
    }}>
      <div className="anim-fadeup" style={{
        background: C.white, borderRadius: 20, padding: 32, width: '100%', maxWidth: 420,
        textAlign: 'center', boxShadow: '0 20px 60px rgba(13,27,42,0.25)',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: '#ECFDF5', color: '#10B981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}><IconCheckCircle size={34} /></div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 8 }}>
          ¡Cita confirmada!
        </h2>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, marginBottom: 8 }}>
          <strong style={{ color: C.navy }}>{slot}</strong> con{' '}
          <strong style={{ color: C.navy }}>{doctor.name}</strong>
        </p>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>
          {center.name} — {center.address}
        </p>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
          Recibirás un recordatorio por WhatsApp 24 horas antes de tu cita.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              width: '100%', maxWidth: 320, padding: '14px 40px', borderRadius: 9999,
              background: C.teal, color: C.white, fontSize: 16, fontWeight: 700,
              border: 'none', cursor: 'pointer',
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,27,42,0.55)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 100, padding: '0',
    }}
    onClick={onClose}
    >
      <div
        className="anim-fadeup"
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white, borderRadius: '20px 20px 0 0', padding: '28px 24px 40px',
          width: '100%', maxWidth: 480, boxShadow: '0 -10px 40px rgba(13,27,42,0.18)',
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 20px' }} />
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Confirmar cita</h2>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>
          Verifica los datos antes de confirmar tu cita.
        </p>

        {[
          ['Centro',     center.name],
          ['Doctor',     doctor.name],
          ['Especialidad', doctor.specialty],
          ['Horario',    slot],
          ['Dirección',  center.address],
        ].map(([label, val]) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', gap: 12,
            padding: '10px 0', borderBottom: `1px solid ${C.navyLight}`,
          }}>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 600, minWidth: 90 }}>{label}</span>
            <span style={{ fontSize: 14, color: C.navy, fontWeight: 500, textAlign: 'right', flex: 1 }}>{val}</span>
          </div>
        ))}

        {userData?.phone && (
          <div style={{
            marginTop: 16, padding: '12px 14px', borderRadius: 10, background: C.tealLight,
            display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <span style={{ display: 'flex', color: C.tealDark, marginTop: 1 }}><IconMessage size={15} /></span>
            <p style={{ fontSize: 13, color: C.navy }}>
              Recibirás la confirmación al +52 *** *** {userData.phone.slice(-4)}
            </p>
          </div>
        )}

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setConfirmed(true)}
            style={{
              width: '100%', maxWidth: 320, padding: '16px 40px', borderRadius: 9999,
              background: C.teal, color: C.white, fontSize: 16, fontWeight: 700,
              border: 'none', cursor: 'pointer',
            }}
          >
            Confirmar cita
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%', maxWidth: 320, padding: '14px 40px', borderRadius: 9999,
              background: 'transparent', color: C.muted, fontSize: 15, fontWeight: 600,
              border: `1.5px solid ${C.border}`, cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function DoctorCard({ doctor, center, userData }) {
  const [expanded, setExpanded] = useState(false);
  const [appointment, setAppointment] = useState(null);

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', borderRadius: 12,
          background: expanded ? C.navyLight : C.surface,
          border: `1.5px solid ${expanded ? C.navy : C.border}`,
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: expanded ? C.navy : C.navyLight,
          color: expanded ? C.white : C.navy,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.2s',
        }}>
          <IconUser size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{doctor.name}</p>
          <p style={{ fontSize: 13, color: C.muted }}>{doctor.specialty}</p>
        </div>
        <span style={{ color: C.navy, display: 'flex', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>
          <IconChevronDown size={18} />
        </span>
      </div>

      {expanded && (
        <div className="anim-fadein" style={{
          padding: '14px 16px 16px',
          borderRadius: '0 0 12px 12px',
          border: `1.5px solid ${C.navy}`,
          borderTop: 'none',
          background: C.white,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 10 }}>
            Horarios disponibles esta semana:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {doctor.slots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setAppointment({ slot })}
                style={{
                  padding: '8px 14px', borderRadius: 10,
                  background: C.teal, color: C.white,
                  fontSize: 13, fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {appointment && (
        <AppointmentModal
          center={center}
          doctor={doctor}
          slot={appointment.slot}
          userData={userData}
          onClose={() => setAppointment(null)}
        />
      )}
    </div>
  );
}

function CenterCard({ center, userData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      borderRadius: 16,
      border: `1.5px solid ${C.border}`,
      background: C.white,
      marginBottom: 16,
      overflow: 'hidden',
    }}>
      {/* Center header */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{ padding: '18px 18px 14px', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: C.navyLight, color: C.navy, display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <IconStethoscope size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: C.navy }}>{center.name}</p>
              {center.badge && (
                <span style={{
                  padding: '2px 8px', borderRadius: 20,
                  background: center.badge === 'Gratuito' ? '#ECFDF5' : C.tealLight,
                  color: center.badge === 'Gratuito' ? '#065F46' : C.tealDark,
                  fontSize: 11, fontWeight: 700,
                }}>
                  {center.badge}
                </span>
              )}
            </div>
            <StarRating rating={center.rating} />
          </div>
        </div>

        <p style={{ fontSize: 13, color: C.muted, marginBottom: 6, lineHeight: 1.45, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <IconMapPin size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          {center.address}
        </p>
        <p style={{ fontSize: 12, color: C.teal, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconWalk size={14} />
          {center.distance}
        </p>

        <div style={{ marginBottom: 4 }}>
          {center.specialty.map(s => <SpecialtyPill key={s} label={s} />)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span style={{ fontSize: 13, color: C.muted }}>
            {center.doctors.length} doctor{center.doctors.length !== 1 ? 'es' : ''} disponibles
          </span>
          <span style={{
            fontSize: 13, fontWeight: 700, color: expanded ? C.navy : C.teal,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {expanded ? 'Cerrar' : 'Ver doctores'}
            <span style={{ display: 'flex', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>
              <IconChevronDown size={14} />
            </span>
          </span>
        </div>
      </div>

      {/* Doctors list */}
      {expanded && (
        <div className="anim-fadein" style={{
          padding: '0 16px 16px',
          borderTop: `1px solid ${C.navyLight}`,
          paddingTop: 14,
        }}>
          {center.doctors.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} center={center} userData={userData} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProfessionalSearch({ userData, onBack, onExit }) {
  const [query, setQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('Todos');

  const allSpecialties = ['Todos', ...new Set(MOCK_CENTERS.flatMap(c => c.specialty))];

  const filtered = MOCK_CENTERS.filter(c => {
    const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase());
    const matchSpec  = filterSpecialty === 'Todos' || c.specialty.includes(filterSpecialty);
    return matchQuery && matchSpec;
  });

  return (
    <div className="anim-fadeup" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Header onBack={onBack} />

      {/* Fixed search + filters zone */}
      <div style={{ flexShrink: 0, padding: '16px 24px 0', background: C.white }}>
        <h1 style={{ fontSize: 21, fontWeight: 800, color: C.navy, marginBottom: 14, letterSpacing: '-0.5px' }}>
          Buscar profesionales
        </h1>

        <div style={{ position: 'relative', marginBottom: 14 }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: C.muted, display: 'flex', pointerEvents: 'none',
          }}><IconSearch size={17} /></span>
          <input
            type="search"
            placeholder="Buscar por nombre o dirección…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', padding: '13px 16px 13px 42px',
              borderRadius: 10, border: `1.5px solid ${C.border}`,
              fontSize: 15, color: C.text, outline: 'none',
              background: C.surface, transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = C.teal)}
            onBlur={e => (e.target.style.borderColor = C.border)}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14 }}>
          {allSpecialties.map(spec => (
            <button
              key={spec}
              onClick={() => setFilterSpecialty(spec)}
              style={{
                padding: '6px 14px', borderRadius: 20, flexShrink: 0,
                fontSize: 13, fontWeight: 600,
                background: filterSpecialty === spec ? C.navy : C.navyLight,
                color: filterSpecialty === spec ? C.white : C.navy,
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {spec}
            </button>
          ))}
        </div>

        <div style={{
          padding: '10px 12px', borderRadius: 10, background: '#FFF7ED',
          border: '1px solid #F59E0B44', marginBottom: 12,
          display: 'flex', gap: 8, alignItems: 'flex-start',
        }}>
          <span style={{ display: 'flex', color: '#92400E', marginTop: 1, flexShrink: 0 }}><IconInfo size={15} /></span>
          <p style={{ fontSize: 12, color: '#92400E', lineHeight: 1.45 }}>
            Datos de ejemplo. Los centros y horarios reales se mostrarán al conectar con el sistema.
          </p>
        </div>
      </div>

      {/* Scrollable results zone */}
      <div style={{ flex: 1, minHeight: 0, padding: '0 24px', overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: C.muted }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <IconSearch size={32} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 600 }}>Sin resultados</p>
            <p style={{ fontSize: 14, marginTop: 4 }}>Intenta con otros filtros.</p>
          </div>
        ) : (
          filtered.map(center => (
            <CenterCard key={center.id} center={center} userData={userData} />
          ))
        )}
        <div style={{ height: 8 }} />
      </div>

      {/* Exit button */}
      <div style={{ flexShrink: 0, paddingTop: 12, paddingBottom: 24, background: C.white, borderTop: `1px solid ${C.navyLight}`, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={onExit}
          style={{
            width: '100%', maxWidth: 320, padding: '14px 40px', borderRadius: 9999,
            background: 'transparent', color: C.muted,
            fontSize: 15, fontWeight: 600,
            border: `1.5px solid ${C.border}`, cursor: 'pointer',
          }}
        >
          Salir del test
        </button>
      </div>
    </div>
  );
}
