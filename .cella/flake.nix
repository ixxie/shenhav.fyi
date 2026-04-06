{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    opencode.url = "github:anomalyco/opencode/dev";
  };

  outputs = { nixpkgs, opencode, ... }: {
    nixosModule = { pkgs, ... }: {
      environment.systemPackages = [
        opencode.packages.${pkgs.stdenv.hostPlatform.system}.default
      ];
    };
  };
}
