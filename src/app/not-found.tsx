import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F9F7F4',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <p
          style={{
            fontSize: '7rem',
            fontWeight: 700,
            color: '#E8DDD0',
            lineHeight: 1,
            marginBottom: '1rem',
            letterSpacing: '-0.04em',
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1C1612', marginBottom: '0.5rem' }}>
          Trang không tìm thấy
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#7A6F62', marginBottom: '2rem', lineHeight: 1.6 }}>
          Địa chỉ này không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.65rem 1.5rem',
            background: '#1C1612',
            color: '#fff',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
