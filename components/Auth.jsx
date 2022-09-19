import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({
                provider: 'github',
            }, {
                scopes: 'repo',
            });
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}
                disabled={loading}
            >
                <span>{loading ? 'Loading' : 'Sign In With Github'}</span>
            </button>
        </div>
    )
}
