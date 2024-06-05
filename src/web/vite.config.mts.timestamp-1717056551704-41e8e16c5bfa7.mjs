// vite.config.mts
import { defineConfig, loadEnv } from "file:///C:/Users/Eigenaar/OneDrive%20-%20ROCvA,%20ROCvF%20en%20VOvA/Bureaublad/Blok%204/huukuuvuujoo20/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import { globSync } from "file:///C:/Users/Eigenaar/OneDrive%20-%20ROCvA,%20ROCvF%20en%20VOvA/Bureaublad/Blok%204/huukuuvuujoo20/src/web/node_modules/glob/dist/esm/index.js";
import eslint from "file:///C:/Users/Eigenaar/OneDrive%20-%20ROCvA,%20ROCvF%20en%20VOvA/Bureaublad/Blok%204/huukuuvuujoo20/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Eigenaar\\OneDrive - ROCvA, ROCvF en VOvA\\Bureaublad\\Blok 4\\huukuuvuujoo20\\src\\web";
var vite_config_default = defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "VITE");
  const viteConfiguration = Object.entries(env).reduce((prev, [key, val]) => {
    return {
      ...prev,
      [key.substring("VITE_".length)]: val
    };
  }, {});
  let htmlFiles;
  if (config.mode === "development") {
    htmlFiles = globSync("**/*.html", {
      cwd: resolve(__vite_injected_original_dirname, "./wwwroot")
    });
  } else {
    htmlFiles = globSync("wwwroot/**/*.html", {
      cwd: resolve(__vite_injected_original_dirname, "./")
    });
  }
  const input = {};
  htmlFiles.forEach((e, i) => {
    input[`app_${i}`] = resolve(e);
  });
  return {
    base: "./",
    root: "wwwroot",
    appType: "mpa",
    resolve: {
      alias: {
        "/src": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input
      },
      outDir: resolve(__vite_injected_original_dirname, "../../dist/web"),
      emptyOutDir: true
    },
    esbuild: {
      supported: {
        "top-level-await": true
      }
    },
    plugins: [eslint()],
    define: {
      viteConfiguration
    },
    server: {
      strictPort: true,
      port: 3e3
    },
    preview: {
      strictPort: true,
      port: 3e3
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRWlnZW5hYXJcXFxcT25lRHJpdmUgLSBST0N2QSwgUk9DdkYgZW4gVk92QVxcXFxCdXJlYXVibGFkXFxcXEJsb2sgNFxcXFxodXVrdXV2dXVqb28yMFxcXFxzcmNcXFxcd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFaWdlbmFhclxcXFxPbmVEcml2ZSAtIFJPQ3ZBLCBST0N2RiBlbiBWT3ZBXFxcXEJ1cmVhdWJsYWRcXFxcQmxvayA0XFxcXGh1dWt1dXZ1dWpvbzIwXFxcXHNyY1xcXFx3ZWJcXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9FaWdlbmFhci9PbmVEcml2ZSUyMC0lMjBST0N2QSwlMjBST0N2RiUyMGVuJTIwVk92QS9CdXJlYXVibGFkL0Jsb2slMjA0L2h1dWt1dXZ1dWpvbzIwL3NyYy93ZWIvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGdsb2JTeW5jIH0gZnJvbSBcImdsb2JcIjtcclxuaW1wb3J0IGVzbGludCBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZW52OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gbG9hZEVudihjb25maWcubW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJWSVRFXCIpO1xyXG5cclxuICAgIGNvbnN0IHZpdGVDb25maWd1cmF0aW9uOiBhbnkgPSBPYmplY3QuZW50cmllcyhlbnYpLnJlZHVjZSgocHJldiwgW2tleSwgdmFsXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnByZXYsXHJcbiAgICAgICAgICAgIFtrZXkuc3Vic3RyaW5nKFwiVklURV9cIi5sZW5ndGgpXTogdmFsLFxyXG4gICAgICAgIH07XHJcbiAgICB9LCB7fSk7XHJcblxyXG4gICAgbGV0IGh0bWxGaWxlczogc3RyaW5nW107XHJcblxyXG4gICAgaWYgKGNvbmZpZy5tb2RlID09PSBcImRldmVsb3BtZW50XCIpIHtcclxuICAgICAgICBodG1sRmlsZXMgPSBnbG9iU3luYyhcIioqLyouaHRtbFwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi93d3dyb290XCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBodG1sRmlsZXMgPSBnbG9iU3luYyhcInd3d3Jvb3QvKiovKi5odG1sXCIsIHtcclxuICAgICAgICAgICAgY3dkOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL1wiKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnB1dDogYW55ID0ge307XHJcbiAgICBodG1sRmlsZXMuZm9yRWFjaCgoZTogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpbnB1dFtgYXBwXyR7aX1gXSA9IHJlc29sdmUoZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhc2U6IFwiLi9cIixcclxuICAgICAgICByb290OiBcInd3d3Jvb3RcIixcclxuICAgICAgICBhcHBUeXBlOiBcIm1wYVwiLFxyXG4gICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgICAgIFwiL3NyY1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdXREaXI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2Rpc3Qvd2ViXCIpLFxyXG4gICAgICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVzYnVpbGQ6IHtcclxuICAgICAgICAgICAgc3VwcG9ydGVkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvcC1sZXZlbC1hd2FpdFwiOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGx1Z2luczogW2VzbGludCgpXSxcclxuICAgICAgICBkZWZpbmU6IHtcclxuICAgICAgICAgICAgdml0ZUNvbmZpZ3VyYXRpb246IHZpdGVDb25maWd1cmF0aW9uLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2aWV3OiB7XHJcbiAgICAgICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdlLFNBQVMsY0FBYyxlQUFlO0FBQ3RnQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxZQUFZO0FBSG5CLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLFdBQVc7QUFDcEMsUUFBTSxNQUE4QixRQUFRLE9BQU8sTUFBTSxRQUFRLElBQUksR0FBRyxNQUFNO0FBRTlFLFFBQU0sb0JBQXlCLE9BQU8sUUFBUSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTTtBQUM1RSxXQUFPO0FBQUEsTUFDSCxHQUFHO0FBQUEsTUFDSCxDQUFDLElBQUksVUFBVSxRQUFRLE1BQU0sQ0FBQyxHQUFHO0FBQUEsSUFDckM7QUFBQSxFQUNKLEdBQUcsQ0FBQyxDQUFDO0FBRUwsTUFBSTtBQUVKLE1BQUksT0FBTyxTQUFTLGVBQWU7QUFDL0IsZ0JBQVksU0FBUyxhQUFhO0FBQUEsTUFDOUIsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxJQUN2QyxDQUFDO0FBQUEsRUFDTCxPQUFPO0FBQ0gsZ0JBQVksU0FBUyxxQkFBcUI7QUFBQSxNQUN0QyxLQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUFBLElBQ2hDLENBQUM7QUFBQSxFQUNMO0FBRUEsUUFBTSxRQUFhLENBQUM7QUFDcEIsWUFBVSxRQUFRLENBQUMsR0FBVyxNQUFjO0FBQ3hDLFVBQU0sT0FBTyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUM7QUFBQSxFQUNqQyxDQUFDO0FBRUQsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0gsUUFBUSxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0o7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUFBLE1BQ0EsUUFBUSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQzNDLGFBQWE7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1AsbUJBQW1CO0FBQUEsTUFDdkI7QUFBQSxJQUNKO0FBQUEsSUFDQSxTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsSUFDbEIsUUFBUTtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDSixZQUFZO0FBQUEsTUFDWixNQUFNO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsWUFBWTtBQUFBLE1BQ1osTUFBTTtBQUFBLElBQ1Y7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
