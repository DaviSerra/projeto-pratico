const Logo = () => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 flex items-center justify-center">
      <img loading="lazy" src="/design/policia-civil-logo.svg" />
    </div>
    <div className="flex flex-col">
      <span className="text-primary dark:text-secondary-300 font-medium text-base leading-tight tracking-wide">
        Pessoas Desaparecidas
      </span>
      <span className="text-dark-500 dark:text-gray-400 font-normal text-sm leading-tight">
        Polícia Judiciária Civil | MT
      </span>
    </div>
  </div>
);

export default Logo;
