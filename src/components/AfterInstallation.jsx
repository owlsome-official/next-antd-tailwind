const AfterInstallation = () => {
  return (
    <div
      data-testid="after-installation-container"
      className="w-full p-1.5"
    >
      <div className="flex flex-col p-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="text-accent text-h3 font-bold tracking-tight">
            After Installation
          </div>
          <a
            href="https://www.pantone.com/color-of-the-year/2026"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-mini font-semibold transition-opacity hover:opacity-80"
          >
            <div className="h-3 w-3 rounded-sm border border-accent-soft/30 bg-[#F1F0EC] shadow-sm" />
            <span>Pantone 2026 — Cloud Dancer</span>
          </a>
        </div>

        <div className="mt-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
          <strong className="text-p">
            You have to edit text by name below this{" "}
            <span className="text-accent-soft font-bold">
              {"(Trick: use \"Find All and Replace\")"}
            </span>
          </strong>
          <ul className="mt-2 list-[upper-roman] space-y-0.5 pl-8 text-small wrap-break-word opacity-90">
            <li>REPLACE_WITH_YOUR_PROJECT_NAME</li>
            <li>REPLACE_WITH_YOUR_PROJECT_DESCRIPTION</li>
            <li>REPLACE_WITH_YOUR_APP_API</li>
            <li>REPLACE_WITH_YOUR_APP_GIT_LINK</li>
            <li>REPLACE_WITH_YOUR_GROUP_NAME</li>
            <li>REPLACE_WITH_YOUR_SONARQUBE_IP_AND_PORT</li>
            <li>REPLACE_WITH_YOUR_DOCKER_REGISTRY</li>
          </ul>
        </div>

        <div className="mt-3 rounded-lg border border-accent-soft/20 bg-warm/10 px-4 py-2.5 text-small leading-tight text-accent">
          <strong>Note:</strong> REPLACE_WITH_YOUR_SONARQUBE_IP_AND_PORT should
          be like {'"sub.host.com:9000" or "172.1.2.3:9000"'}
        </div>

        <sup className="mt-4 opacity-5">
          จะรู้ได้ไงคนไหนคนไทย ถ้าแบ่งปันให้กันใช้ละคนไทยแน่นอน
        </sup>
      </div>
    </div>
  );
};

export default AfterInstallation;
