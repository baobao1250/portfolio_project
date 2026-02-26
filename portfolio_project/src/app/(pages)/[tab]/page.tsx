import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { notFound } from 'next/navigation';
import TabNavigation from '@/components/layout/TabNavigation'; // <--- Import component vừa tạo

// --- 1. Loading & Import (Giữ nguyên) ---
const TabSkeleton = () => (
    <div className="p-4 text-gray-400 animate-pulse">Loading data...</div>
);
const loadTabComponent = (importFunc: () => Promise<any>) => {
    return dynamic(importFunc, { loading: TabSkeleton });
};

const TabHome = loadTabComponent(() => import('@/components/features/tabs/home'));
const TabAbout = loadTabComponent(() => import('@/components/features/tabs/about'));
const TabContact = loadTabComponent(() => import('@/components/features/tabs/contact'));

const TAB_COMPONENTS: Record<string, ComponentType<any>> = {
    'home': TabHome,
    'about': TabAbout,
    'contact': TabContact,
};

export default async function DynamicTabPage({
    params,
}: {
    params: Promise<{ tab: string }>;
}) {
    const { tab } = await params;

    const ActiveComponent = TAB_COMPONENTS[tab];

    if (!ActiveComponent) {
        return notFound();
    }

    return (
        <div className="h-full w-full py-3">
            <TabNavigation activeTab={tab} />
            <div className="tab-content-area rounded-lg shadow-sm px-6 bg-inherit">
                <ActiveComponent />
            </div>
        </div>
    );
}