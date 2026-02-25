// vite.config.ts
import { defineConfig } from "file:///E:/xampp/htdocs/shivshetu/admin/node_modules/vite/dist/node/index.js";
import react from "file:///E:/xampp/htdocs/shivshetu/admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs/promises";
import svgr from "file:///E:/xampp/htdocs/shivshetu/admin/node_modules/@svgr/rollup/dist/index.js";
var __vite_injected_original_dirname = "E:\\xampp\\htdocs\\shivshetu\\admin";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      src: resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    port: 3001,
    // 👈 ADD THIS
    host: true
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.tsx?$/,
    exclude: []
  },
  optimizeDeps: {
    include: [
      "@ckeditor/ckeditor5-build-classic",
      "@mui/material",
      "@mui/x-date-pickers",
      "@emotion/react",
      "@emotion/styled",
      "dayjs"
    ],
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-tsx",
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async (args) => ({
                loader: "tsx",
                contents: await fs.readFile(args.path, "utf8")
              })
            );
          }
        }
      ]
    }
  },
  plugins: [svgr(), react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcc2hpdnNoZXR1XFxcXGFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcc2hpdnNoZXR1XFxcXGFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi94YW1wcC9odGRvY3Mvc2hpdnNoZXR1L2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzL3Byb21pc2VzJztcclxuaW1wb3J0IHN2Z3IgZnJvbSAnQHN2Z3Ivcm9sbHVwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgc3JjOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDMwMDEsICAgLy8gXHVEODNEXHVEQzQ4IEFERCBUSElTXHJcbiAgICAgICAgaG9zdDogdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgICAgbG9hZGVyOiAndHN4JyxcclxuICAgICAgICBpbmNsdWRlOiAvc3JjXFwvLipcXC50c3g/JC8sXHJcbiAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICB9LFxyXG5cclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgJ0Bja2VkaXRvci9ja2VkaXRvcjUtYnVpbGQtY2xhc3NpYycsXHJcbiAgICAgICAgICAgICdAbXVpL21hdGVyaWFsJyxcclxuICAgICAgICAgICAgJ0BtdWkveC1kYXRlLXBpY2tlcnMnLFxyXG4gICAgICAgICAgICAnQGVtb3Rpb24vcmVhY3QnLFxyXG4gICAgICAgICAgICAnQGVtb3Rpb24vc3R5bGVkJyxcclxuICAgICAgICAgICAgJ2RheWpzJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZXNidWlsZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsb2FkLWpzLWZpbGVzLWFzLXRzeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dXAoYnVpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGQub25Mb2FkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmaWx0ZXI6IC9zcmNcXFxcLipcXC5qcyQvIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYyAoYXJncykgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICd0c3gnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBhd2FpdCBmcy5yZWFkRmlsZShhcmdzLnBhdGgsICd1dGY4JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHBsdWdpbnM6IFtzdmdyKCksIHJlYWN0KCldLFxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlSLFNBQVMsb0JBQW9CO0FBQ3RULE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNKO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUEsSUFDVCxTQUFTLENBQUM7QUFBQSxFQUNkO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDVixTQUFTO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDTDtBQUFBLFVBQ0ksTUFBTTtBQUFBLFVBQ04sTUFBTSxPQUFPO0FBQ1Qsa0JBQU07QUFBQSxjQUNGLEVBQUUsUUFBUSxlQUFlO0FBQUEsY0FDekIsT0FBTyxVQUFVO0FBQUEsZ0JBQ2IsUUFBUTtBQUFBLGdCQUNSLFVBQVUsTUFBTSxHQUFHLFNBQVMsS0FBSyxNQUFNLE1BQU07QUFBQSxjQUNqRDtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBRUEsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDN0IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
