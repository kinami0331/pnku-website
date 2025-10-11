import React, { Suspense, useEffect, useState } from 'react';

import { SimpleTemplateFile } from '@/components/Template';

interface RemoteComponentProps {
    componentName: string;
    remoteUrl?: string;
    fallback?: React.ComponentType;
    [key: string]: any;
}

// 开发环境的组件映射
const devComponents = {
    // componentA: lazy(() => import('../components/RemoteComponentA')),
    // componentB: lazy(() => import('../components/RemoteComponentB')),
};

// 动态导入远程组件
const loadRemoteComponent = async (url: string) => {
    console.log(url);
    const module = await import(url);
    console.log(module);
    return module.default;
};

export const RemoteComponent: React.FC<RemoteComponentProps> = ({
    componentName,
    remoteUrl,
    fallback: Fallback,
    ...props
}) => {
    const [RemoteComp, setRemoteComp] = useState<React.ComponentType<any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!remoteUrl) {
                    // 开发环境或没有远程URL时，使用本地组件
                    const DevComponent = devComponents[componentName as keyof typeof devComponents];
                    if (DevComponent) {
                        setRemoteComp(() => DevComponent);
                    } else {
                        throw new Error(`Component ${componentName} not found in dev mode`);
                    }
                } else {
                    // 生产环境，加载远程组件
                    const component = await loadRemoteComponent(remoteUrl);
                    setRemoteComp(() => component);
                }
            } catch (err) {
                console.error('Failed to load remote component:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');

                // 降级到本地组件
                const DevComponent = devComponents[componentName as keyof typeof devComponents];
                if (DevComponent) {
                    setRemoteComp(() => DevComponent);
                }
            } finally {
                setLoading(false);
            }
        };

        loadComponent();
    }, [componentName, remoteUrl]);

    if (loading) {
        return <div>Loading component...</div>;
    }

    if (error && !RemoteComp) {
        return Fallback ? <Fallback /> : <div>Failed to load component: {error}</div>;
    }

    if (!RemoteComp) {
        return Fallback ? <Fallback /> : <div>Component not found</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RemoteComp {...props} />
        </Suspense>
    );
};

export default function IntroductionPage() {
    return (
        <>
            <RemoteComponent componentName={'Test'} remoteUrl={'/media/Test.js'} />
            <SimpleTemplateFile name={'introduction'} />
        </>
    );
}
