import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

export default function AppShell({ activeShellItem, children }) {
  return (
    <div
      className="app-page app-shell bg-surface text-on-surface font-body h-screen overflow-hidden flex flex-col"
      data-nucleus={activeShellItem.id}
      data-nucleus-tone={activeShellItem.tone}
      data-shell-scope={activeShellItem.scope}
    >
      <Header activeShellItem={activeShellItem} />
      <div className="app-shell-body flex flex-1 overflow-hidden">
        <Sidebar activeShellItem={activeShellItem} />
        <main className="app-shell-main flex-1 overflow-y-auto flex flex-col relative">
          <div className="app-shell-content">
            {children}
          </div>
          <Footer activeShellItem={activeShellItem} />
        </main>
      </div>
    </div>
  );
}
