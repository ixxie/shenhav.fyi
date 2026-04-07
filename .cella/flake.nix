{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    opencode.url = "github:anomalyco/opencode/dev";
  };

  outputs = { nixpkgs, opencode, ... }: {
    nixosModule = { pkgs, ... }: {
      environment.systemPackages = [
        opencode.packages.${pkgs.stdenv.hostPlatform.system}.default
        pkgs.python313
        pkgs.playwright-driver.browsers
      ];
      environment.variables.PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
      environment.variables.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
    };
  };
}
