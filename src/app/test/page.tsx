export default function TestPage() {
    return (
        <div style={{ padding: 50, textAlign: 'center' }}>
            <h1>System Status: Operational</h1>
            <p>If you can see this, the deployment is working.</p>
            <p>Timestamp: {new Date().toISOString()}</p>
        </div>
    )
}
