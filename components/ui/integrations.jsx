"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";
import { TechIcon } from "../TechIcon/TechIcon";
import Link from "next/link";
import "./integrations.css";

export const DEFAULT_INTEGRATIONS = [
  {
    name: "Empty 1",
  },
  {
    name: "Vercel",
    src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDIyMiIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Im0xMjggMCAxMjggMjIxLjcwNUgweiIvPjwvc3ZnPg==",
    isInvertable: true,
  },
  {
    name: "OpenAI",
    src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjYwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgdmlld0JveD0iMCAwIDI1NiAyNjAiPjxwYXRoIGQ9Ik0yMzkuMTg0IDEwNi4yMDNhNjQuNzE2IDY0LjcxNiAwIDAgMC01LjU3Ni01My4xMDNDMjE5LjQ1MiAyOC40NTkgMTkxIDE1Ljc4NCAxNjMuMjEzIDIxLjc0QTY1LjU4NiA2NS41ODYgMCAwIDAgNTIuMDk2IDQ1LjIyYTY0LjcxNiA2NC43MTYgMCAwIDAtNDMuMjMgMzEuMzZjLTE0LjMxIDI0LjYwMi0xMS4wNjEgNTUuNjM0IDguMDMzIDc2Ljc0YTY0LjY2NSA2NC42NjUgMCAwIDAgNS41MjUgNTMuMTAyYzE0LjE3NCAyNC42NSA0Mi42NDQgMzcuMzI0IDcwLjQ0NiAzMS4zNmE2NC43MiA2NC43MiAwIDAgMCA0OC43NTQgMjEuNzQ0YzI4LjQ4MS4wMjUgNTMuNzE0LTE4LjM2MSA2Mi40MTQtNDUuNDgxYTY0Ljc2NyA2NC43NjcgMCAwIDAgNDMuMjI5LTMxLjM2YzE0LjEzNy0yNC41NTggMTAuODc1LTU1LjQyMy04LjA4My03Ni40ODNabS05Ny41NiAxMzYuMzM4YTQ4LjM5NyA0OC4zOTcgMCAwIDEtMzEuMTA1LTExLjI1NWwxLjUzNS0uODcgNTEuNjctMjkuODI1YTguNTk1IDguNTk1IDAgMCAwIDQuMjQ3LTcuMzY3di03Mi44NWwyMS44NDUgMTIuNjM2Yy4yMTguMTExLjM3LjMyLjQwOS41NjN2NjAuMzY3Yy0uMDU2IDI2LjgxOC0yMS43ODMgNDguNTQ1LTQ4LjYwMSA0OC42MDFabS0xMDQuNDY2LTQ0LjYxYTQ4LjM0NSA0OC4zNDUgMCAwIDEtNS43ODEtMzIuNTg5bDEuNTM0LjkyMSA1MS43MjIgMjkuODI2YTguMzM5IDguMzM5IDAgMCAwIDguNDQxIDBsNjMuMTgxLTM2LjQyNXYyNS4yMjFhLjg3Ljg3IDAgMCAxLS4zNTguNjY1bC01Mi4zMzUgMzAuMTg0Yy0yMy4yNTcgMTMuMzk4LTUyLjk3IDUuNDMxLTY2LjQwNC0xNy44MDNaTTIzLjU0OSA4NS4zOGE0OC40OTkgNDguNDk5IDAgMCAxIDI1LjU4LTIxLjMzM3Y2MS4zOWE4LjI4OCA4LjI4OCAwIDAgMCA0LjE5NSA3LjMxNmw2Mi44NzQgMzYuMjcyLTIxLjg0NSAxMi42MzZhLjgxOS44MTkgMCAwIDEtLjc2NyAwTDQxLjM1MyAxNTEuNTNjLTIzLjIxMS0xMy40NTQtMzEuMTcxLTQzLjE0NC0xNy44MDQtNjYuNDA1di4yNTZabTE3OS40NjYgNDEuNjk1LTYzLjA4LTM2LjYzTDE2MS43MyA3Ny44NmEuODE5LjgxOSAwIDAgMSAuNzY4IDBsNTIuMjMzIDMwLjE4NGE0OC42IDQ4LjYgMCAwIDEtNy4zMTYgODcuNjM1di02MS4zOTFhOC41NDQgOC41NDQgMCAwIDAtNC40LTcuMjEzWm0yMS43NDItMzIuNjktMS41MzUtLjkyMi01MS42MTktMzAuMDgxYTguMzkgOC4zOSAwIDAgMC04LjQ5MiAwTDk5Ljk4IDk5LjgwOFY3NC41ODdhLjcxNi43MTYgMCAwIDEgLjMwNy0uNjY1bDUyLjIzMy0zMC4xMzNhNDguNjUyIDQ4LjY1MiAwIDAgMSA3Mi4yMzYgNTAuMzkxdi4yMDVaTTg4LjA2MSAxMzkuMDk3bC0yMS44NDUtMTIuNTg1YS44Ny44NyAwIDAgMS0uNDEtLjYxNFY2NS42ODVhNDguNjUyIDQ4LjY1MiAwIDAgMSA3OS43NTctMzcuMzQ2bC0xLjUzNS44Ny01MS42NyAyOS44MjVhOC41OTUgOC41OTUgMCAwIDAtNC4yNDYgNy4zNjdsLS4wNTEgNzIuNjk3Wm0xMS44NjgtMjUuNTggMjguMTM4LTE2LjIxNyAyOC4xODggMTYuMjE4djMyLjQzNGwtMjguMDg2IDE2LjIxOC0yOC4xODgtMTYuMjE4LS4wNTItMzIuNDM0WiIvPjwvc3ZnPg==",
    isInvertable: true,
  },
  {
    src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTA5IDExMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjMuNzA3NiAxMTAuMjg0QzYwLjg0ODEgMTEzLjg4NSA1NS4wNTAyIDExMS45MTIgNTQuOTgxMyAxMDcuMzE0TDUzLjk3MzggNDAuMDYyN0w5OS4xOTM1IDQwLjA2MjdDMTA3LjM4NCA0MC4wNjI3IDExMS45NTIgNDkuNTIyOCAxMDYuODU5IDU1LjkzNzRMNjMuNzA3NiAxMTAuMjg0WiIgZmlsbD0idXJsKCNzdXBhYmFzZV9fcGFpbnQwX2xpbmVhcikiLz48cGF0aCBkPSJNNjMuNzA3NiAxMTAuMjg0QzYwLjg0ODEgMTEzLjg4NSA1NS4wNTAyIDExMS45MTIgNTQuOTgxMyAxMDcuMzE0TDUzLjk3MzggNDAuMDYyN0w5OS4xOTM1IDQwLjA2MjdDMTA3LjM4NCA0MC4wNjI3IDExMS45NTIgNDkuNTIyOCAxMDYuODU5IDU1LjkzNzRMNjMuNzA3NiAxMTAuMjg0WiIgZmlsbD0idXJsKCNzdXBhYmFzZV9fcGFpbnQxX2xpbmVhcikiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTQ1LjMxNyAyLjA3MTAzQzQ4LjE3NjUgLTEuNTMwMzcgNTMuOTc0NSAwLjQ0MjkzNyA1NC4wNDM0IDUuMDQxTDU0LjQ4NDkgNzIuMjkyMkg5LjgzMTEzQzEuNjQwMzggNzIuMjkyMiAtMi45Mjc3NSA2Mi44MzIxIDIuMTY1NSA1Ni40MTc1TDQ1LjMxNyAyLjA3MTAzWiIgZmlsbD0iIzNFQ0Y4RSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ic3VwYWJhc2VfX3BhaW50MF9saW5lYXIiIHgxPSI1My45NzM4IiB5MT0iNTQuOTc0IiB4Mj0iOTQuMTYzNSIgeTI9IjcxLjgyOTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMjQ5MzYxIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0VDRjhFIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InN1cGFiYXNlX19wYWludDFfbGluZWFyIiB4MT0iMzYuMTU1OCIgeTE9IjMwLjU3OCIgeDI9IjU0LjQ4NDQiIHkyPSI2NS4wODA2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3AvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+",
    name: "Supabase",
  },
  {
    name: "GitHub",
    src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAwQzMuNTggMCAwIDMuNTggMCA4QzAgMTEuNTQgMi4yOSAxNC41MyA1LjQ3IDE1LjU5QzUuODcgMTUuNjYgNi4wMiAxNS40MiA2LjAyIDE1LjIxQzYuMDIgMTUuMDIgNi4wMSAxNC4zOSA2LjAxIDEzLjcyQzQgMTQuMDkgMy40OCAxMy4yMyAzLjMyIDEyLjc4QzMuMjMgMTIuNTUgMi44NCAxMS44NCAyLjUgMTEuNjVDMi4yMiAxMS41IDEuODIgMTEuMTMgMi40OSAxMS4xMkMzLjEyIDExLjExIDMuNTcgMTEuNyAzLjcyIDExLjk0QzQuNDQgMTMuMTUgNS41OSAxMi44MSA2LjA1IDEyLjZDNi4xMiAxMi4wOCA2LjMzIDExLjczIDYuNTYgMTEuNTNDNC43OCAxMS4zMyAyLjkyIDEwLjY0IDIuOTIgNy41OEMyLjkyIDYuNzEgMy4yMyA1Ljk5IDMuNzQgNS40M0MzLjY2IDUuMjMgMy4zOCA0LjQxIDMuODIgMy4zMUMzLjgyIDMuMzEgNC40OSAzLjEgNi4wMiA0LjEzQzYuNjYgMy45NSA3LjM0IDMuODYgOC4wMiAzLjg2QzguNyAzLjg2IDkuMzggMy45NSAxMC4wMiA0LjEzQzExLjU1IDMuMDkgMTIuMjIgMy4zMSAxMi4yMiAzLjMxQzEyLjY2IDQuNDEgMTIuMzggNS4yMyAxMi4zIDUuNDNDMTIuODEgNS45OSAxMy4xMiA2LjcgMTMuMTIgNy41OEMxMy4xMiAxMC42NSAxMS4yNSAxMS4zMyA5LjQ3IDExLjUzQzkuNzYgMTEuNzggMTAuMDEgMTIuMjYgMTAuMDEgMTMuMDFDMTAuMDEgMTQuMDggMTAgMTQuOTQgMTAgMTUuMjFDMTAgMTUuNDIgMTAuMTUgMTUuNjcgMTAuNTUgMTUuNTlDMTMuNzEgMTQuNTMgMTYgMTEuNTMgMTYgOEMxNiAzLjU4IDEyLjQyIDAgOCAwWiIgdHJhbnNmb3JtPSJzY2FsZSg2NCkiIGZpbGw9IiMxQjFGMjMiLz48L3N2Zz4=",
    isInvertable: true,
  },
  {
    name: "Notion",
    src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjY4IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgdmlld0JveD0iMCAwIDI1NiAyNjgiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xNi4wOTIgMTEuNTM4IDE2NC4wOS42MDhjMTguMTc5LTEuNTYgMjIuODUtLjUwOCAzNC4yOCA3LjgwMWw0Ny4yNDMgMzMuMjgyQzI1My40MDYgNDcuNDE0IDI1NiA0OC45NzUgMjU2IDU1LjIwN3YxODIuNTI3YzAgMTEuNDM5LTQuMTU1IDE4LjIwNS0xOC42OTYgMTkuMjRMNjUuNDQgMjY3LjM3OGMtMTAuOTEzLjUxNy0xNi4xMS0xLjA0My0yMS44MjUtOC4zMjdMOC44MjYgMjEzLjgxNEMyLjU4NiAyMDUuNDg3IDAgMTk5LjI1NCAwIDE5MS45N1YyOS43MjZjMC05LjM1MiA0LjE1NS0xNy4xNTMgMTYuMDkyLTE4LjE4OFoiLz48cGF0aCBkPSJNMTY0LjA5LjYwOCAxNi4wOTIgMTEuNTM4QzQuMTU1IDEyLjU3MyAwIDIwLjM3NCAwIDI5LjcyNnYxNjIuMjQ1YzAgNy4yODQgMi41ODUgMTMuNTE2IDguODI2IDIxLjg0M2wzNC43ODkgNDUuMjM3YzUuNzE1IDcuMjg0IDEwLjkxMiA4Ljg0NCAyMS44MjUgOC4zMmRsMTcxLjg2NC0xMC40MDRjMTQuNTMyLTEuMDM1IDE4LjY5Ni03LjgwMSAxOC42OTYtMTkuMjRWNTUuMjA3YzAtNS45MTEtMi4zMzYtNy42MTQtOS4yMS0xMi42NmwtMS4xODUtLjg1NkwxOTguMzcgOC40MDlDMTg2Ljk0LjEgMTgyLjI3LS45NTIgMTY0LjA5LjYwOFpNNjkuMzI3IDUyLjIyYy0xNC4wMzMuOTQ1LTE3LjIxNiAxLjE1OS0yNS4xODYtNS4zMjNMMjMuODc2IDMwLjc3OGMtMi4wNi0yLjA4Ni0xLjAyNi00LjY5IDQuMTYzLTUuMjA3bDE0Mi4yNzQtMTAuMzk1YzExLjk0Ny0xLjA0MyAxOC4xNyAzLjEyIDIyLjg0MiA2Ljc1OGwyNC40MDEgMTcuNjhjMS4wNDMuNTI1IDMuNjM4IDMuNjM3LjUxNyAzLjYzN0w3MS4xNDYgNTIuMDk1bC0xLjgxOS4xMjVabS0xNi4zNiAxODMuOTU0VjgxLjIyMmMwLTYuNzY3IDIuMDc3LTkuODg3IDguMy0xMC40MTNMMjMwLjAyIDYwLjkzYzUuNzI0LS41MTcgOC4zMSAzLjEyIDguMzEgOS44Nzl2MTUzLjkxN2MwIDYuNzY3LTEuMDQ0IDEyLjQ5LTEwLjM4NyAxMy4wMDhsLTE2MS40ODcgOS4zNjFjLTkuMzQzLjUxNy0xMy40ODktMi41OTQtMTMuNDg5LTEwLjkyMVpNMjEyLjM3NyA4OS41M2MxLjAzNCA0LjY4MSAwIDkuMzYyLTQuNjgxIDkuODk3bC03Ljc4MyAxLjU0MnYxMTQuNDA0Yy02Ljc1OCAzLjYzNy0xMi45ODEgNS43MTUtMTguMTggNS43MTUtOC4zMDggMC0xMC4zODYtMi42MDQtMTYuNjA5LTEwLjM5NmwtNTAuODk4LTgwLjA3OXY3Ny40NzZsMTYuMSAzLjY0NnMwIDkuMzYyLTEyLjk4OSA5LjM2MmwtMzUuODE0IDIuMDc3Yy0xLjA0My0yLjA4NiAwLTcuMjg0IDMuNjMtOC4zMThsOS4zNTEtMi41OTVWMTA5LjgyM2wtMTIuOTgtMS4wNTJjLTEuMDQ0LTQuNjggMS41NS0xMS40MzkgOC44MjYtMTEuOTY1bDM4LjQyNi0yLjU4NSA1Mi45NTggODEuMTEzdi03MS43NmwtMTMuNDk4LTEuNTUyYy0xLjA0My01LjczMyAzLjExMS05Ljg5NiA4LjMtMTAuNDA0bDM1Ljg0LTIuMDg3WiIvPjwvc3ZnPg==",
  },
  {
    name: "Gmail",
    src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgNDkuNCA1MTIgMzk5LjQyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZmlsbD0iIzQyODVmNCIgZD0iTTM0LjkxIDQ0OC44MThoODEuNDU0VjI1MUwwIDE2My43MjdWNDEzLjkxYzAgMTkuMjg3IDE1LjYyMiAzNC45MSAzNC45MSAzNC45MXoiLz48cGF0aCBmaWxsPSIjMzRhODUzIiBkPSJNMzk1LjYzNiA0NDguODE4aDgxLjQ1NWMxOS4yODcgMCAzNC45MDktMTUuNjIyIDM0LjkwOS0zNC45MDlWMTYzLjcyN0wzOTUuNjM2IDI1MXoiLz48cGF0aCBmaWxsPSIjZmJiYzA0IiBkPSJNMzk1LjYzNiA5OS43MjdWMjUxTDUxMiAxNjMuNzI3di00Ni41NDVjMC00My4xNDItNDkuMjUtNjcuNzgyLTgzLjc4Mi00MS44OTF6Ii8+PC9nPjxwYXRoIGZpbGw9IiNlYTQzMzUiIGQ9Ik0xMTYuMzY0IDI1MVY5OS43MjdMMjU2IDIwNC40NTUgMzk1LjYzNiA5OS43MjdWMjUxTDI1NiAzNTUuNzI3eiIvPjxwYXRoIGZpbGw9IiNjNTIyMWYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTAgMTE3LjE4MnY0Ni41NDVMMTE2LjM2NCAyNTFWOTkuNzI3TDgzLjc4MiA3NS4yOTFDNDkuMjUgNDkuNCAwIDc0LjA0IDAgMTE3LjE4eiIvPjwvZz48L3N2Zz4=",
  },
  {
    name: "Google Maps",
    src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5Mi4zIDEzMi4zIj48cGF0aCBmaWxsPSIjMWE3M2U4IiBkPSJNNjAuMiAyLjJDNTUuOC44IDUxIDAgNDYuMSAwIDMyIDAgMTkuMyA2LjQgMTAuOCAxNi41bDIxLjggMTguM0w2MC4yIDIuMnoiLz48cGF0aCBmaWxsPSIjZWE0MzM1IiBkPSJNMTAuOCAxNi41QzQuMSAyNC41IDAgMzQuOSAwIDQ2LjFjMCA4LjcgMS43IDE1LjcgNC42IDIybDI4LTMzLjMtMjEuOC0xOC4zeiIvPjxwYXRoIGZpbGw9IiM0Mjg1ZjQiIGQ9Ik00Ni4yIDI4LjVjOS44IDAgMTcuNyA3LjkgMTcuNyAxNy43IDAgNC4zLTEuNiA4LjMtNC4yIDExLjQgMCAwIDEzLjktMTYuNiAyNy41LTMyLjctNS42LTEwLjgtMTUuMy0xOS0yNy0yMi43TDMyLjYgMzQuOGMzLjMtMy44IDguMS02LjMgMTMuNi02LjMiLz48cGF0aCBmaWxsPSIjZmJiYzA0IiBkPSJNNDYuMiA2My44Yy05LjggMC0xNy43LTcuOS0xNy43LTE3LjcgMC00LjMgMS41LTguMyA0LjEtMTEuM2wtMjggMzMuM2M0LjggMTAuNiAxMi44IDE5LjIgMjEgMjkuOWwzNC4xLTQwLjVjLTMuMyAzLjktOC4xIDYuMy0xMy41IDYuMyIvPjxwYXRoIGZpbGw9IiMzNGE4NTMiIGQ9Ik01OS4xIDEwOS4yYzE1LjQtMjQuMSAzMy4zLTM1IDMzLjMtNjMgMC03LjctMS45LTE0LjktNS4yLTIxLjNMMjUuNiA5OGMyLjYgMy40IDUuMyA3LjMgNy45IDExLjMgOS40IDE0LjUgNi44IDIzLjEgMTIuOCAyMy4xczMuNC04LjcgMTIuOC0yMy4yIi8+PHNjcmlwdC8+PC9zdmc+",
  },
  {
    name: "Neon",
    src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ibmVvbl9fYSIgeDE9IjEwMCUiIHgyPSIxMi4wNjklIiB5MT0iMTAwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjJGNzU1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOEZGOTg2IiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibmVvbl9fYiIgeDE9IjEwMCUiIHgyPSI0MC42MDMlIiB5MT0iMTAwJSIgeTI9Ijc2Ljg5NyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3Atb3BhY2l0eT0iLjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxQTFBMUEiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9IiMwMEUwRDkiIGQ9Ik0wIDQ0LjEzOUMwIDE5Ljc2MiAxOS43NjIgMCA0NC4xMzkgMEgyMTEuODZDMjM2LjIzOCAwIDI1NiAxOS43NjIgMjU2IDQ0LjEzOXYxNDIuNjQ5YzAgMjUuMjE2LTMxLjkxNSAzNi4xNi00Ny4zODggMTYuMjU2bC00OC4zOTItNjIuMjUxdjc1LjQ4NGMwIDIxLjkzOS0xNy43ODQgMzkuNzIzLTM5LjcyMiAzOS43MjNoLTc2LjM2QzE5Ljc2MyAyNTYgMCAyMzYuMjM4IDAgMjExLjg2MVY0NC4xNFptNDQuMTM5LTguODI1Yy00Ljg3OSAwLTguODI1IDMuOTQ2LTguODI1IDguODE4djE2Ny43M2MwIDQuODc4IDMuOTQ2IDguODMxIDguODE4IDguODMxaDc3LjY4OGMyLjQ0IDAgMy4wODctMS45NzcgMy4wODctNC40MTZ2LTEwMS4yMmMwLTI1LjIyMiAzMS45MTQtMzYuMTY2IDQ3LjM5NS0xNi4yNTVsNDguMzkxIDYyLjI0M1Y0NC4xNGMwLTQuODc5LjQ1NS04LjgyNS00LjQxNi04LjgyNUg0NC4xNFoiLz48cGF0aCBmaWxsPSJ1cmwoI25lb25fX2EpIiBkPSJNMCA0NC4xMzlDMCAxOS43NjIgMTkuNzYyIDAgNDQuMTM5IDBIMjExLjg2QzIzNi4yMzggMCAyNTYgMTkuNzYyIDI1NiA0NC4xMzl2MTQyLjY0OWMwIDI1LjIxNi0zMS45MTUgMzYuMTYtNDcuMzg4IDE2LjI1NmwtNDguMzkyLTYyLjI1MXY3NS40ODRjMCAyMS45MzktMTcuNzg0IDM5LjcyMy0zOS43MjIgMzkuNzIzaC03Ni4zNkMxOS43NjMgMjU2IDAgMjM2LjIzOCAwIDIxMS44NjFWNDQuMTRabTQ0LjEzOS04LjgyNWMtNC44NzkgMC04LjgyNSAzLjk0Ni04LjgyNSA4LjgxOHYxNjcuNzNjMCA0Ljg3OCAzLjk0NiA4LjgzMSA4LjgxOCA4LjgzMWg3Ny42ODhjMi40NCAwIDMuMDg3LTEuOTc3IDMuMDg3LTQuNDE2di0xMDEuMjJjMC0yNS4yMjIgMzEuOTE0LTM2LjE2NiA0Ny4zOTUtMTYuMjU1bDQ4LjM5MSA2Mi4yNDNWNDQuMTRjMC00Ljg3OS40NTUtOC44MjUtNC40MTYtOC44MjVINDQuMTRaIi8+PHBhdGggZmlsbD0idXJsKCNuZW9uX19iKSIgZmlsbC1vcGFjaXR5PSIuNCIgZD0iTTAgNDQuMTM5QzAgMTkuNzYyIDE5Ljc2MiAwIDQ0LjEzOSAwSDIxMS44NkMyMzYuMjM4IDAgMjU2IDE5Ljc2MiAyNTYgNDQuMTM5djE0Mi42NDljMCAyNS4yMTYtMzEuOTE1IDM2LjE2LTQ3LjM4OCAxNi4yNTZsLTQ4LjM5Mi02Mi4yNTF2NzUuNDg0YzAgMjEuOTM5LTE3Ljc4NCAzOS43MjMtMzkuNzIyIDM5LjcyM2gtNzYuMzZDMTkuNzYzIDI1NiAwIDIzNi4yMzggMCAyMTEuODYxVjQ0LjE0Wm00NC4xMzktOC44MjVjLTQuODc5IDAtOC44MjUgMy45NDYtOC44MjUgOC44MTh2MTY3LjczYzAgNC44NzggMy45NDYgOC44MzEgOC44MTggOC44MzFoNzcuNjg4YzIuNDQgMCAzLjA4Ny0xLjk3NyAzLjA4Ny00LjQxNnYtMTAxLjIyYzAtMjUuMjIyIDMxLjkxNC0zNi4xNjYgNDcuMzk1LTE2LjI1NWw0OC4zOTEgNjIuMjQzVjQ0LjE0YzAtNC44NzkuNDU1LTguODI1LTQuNDE2LTguODI1SDQ0LjE0WiIvPjxwYXRoIGZpbGw9IiM2M0Y2NTUiIGQ9Ik0yMTEuODYxIDBDMjM2LjIzOCAwIDI1NiAxOS43NjIgMjU2IDQ0LjEzOXYxNDIuNjQ5YzAgMjUuMjE2LTMxLjkxNSAzNi4xNi00Ny4zODggMTYuMjU2bC00OC4zOTItNjIuMjUxdjc1LjQ4NGMwIDIxLjkzOS0xNy43ODQgMzkuNzIzLTM5LjcyMiAzOS43MjNhNC40MDkgNC40MDkgMCAwIDAgNC40MDktNC40MDlWMTE1LjA1OGMwLTI1LjIyMyAzMS45MTQtMzYuMTY3IDQ3LjM5NS0xNi4yNTZsNDguMzkxIDYyLjI0M1Y4LjgyNWMwLTQuODcxLTMuOTUzLTguODI1LTguODMyLTguODI1WiIvPjwvc3ZnPg==",
  },
  {
    name: "Empty 2",
  },
];

/**
 * Maps any tool name to an integration item with src or clean TechIcon fallback
 */
export function getToolIntegration(toolName) {
  const norm = (toolName || "").toLowerCase().trim();
  const match = DEFAULT_INTEGRATIONS.find((i) => i.name.toLowerCase() === norm);
  if (match) return match;
  return {
    name: toolName,
    src: null, // Will render TechIcon SVG
    isInvertable: false,
  };
}

/**
 * Integrations Component (Matches user's UI snippet exactly)
 */
export function Integrations({
  title = "All types of integration",
  subtitle = "Connect your favourite apps and services easily",
  items = DEFAULT_INTEGRATIONS,
  buttonText = "See all integration",
  buttonHref = "/contact",
  className = "",
}) {
  // Ensure starting and ending empty slots if not present
  const data = items.length > 0 && items[0].name === "Empty 1" ? items : [
    { name: "Empty 1" },
    ...items.map((it) => (typeof it === "string" ? getToolIntegration(it) : it)),
    { name: "Empty 2" },
  ];

  return (
    <div className={cn("integrations-root flex flex-col items-center justify-center gap-6 py-12 md:py-16", className)}>
      <div className="max-w-xl space-y-2 px-4 text-center">
        <h2 className="font-semibold text-3xl md:text-4xl tracking-tight text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-muted-foreground md:text-lg text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="integrations-capsule flex flex-col justify-center rounded-full border border-white/10 bg-secondary dark:bg-secondary/10 shadow-lg">
        <div className="mask-l-from-90 mask-r-from-90 flex items-center justify-center -space-x-3 md:-space-x-4 p-1.5 overflow-visible">
          {data.map((item, idx) => (
            <div
              className={cn(
                "relative z-0 transition-transform duration-300",
                item.src || (item.name && !item.name.startsWith("Empty")) ? "hover:z-20 hover:scale-110 cursor-pointer" : "opacity-35 pointer-events-none",
              )}
              key={item.name ? `${item.name}-${idx}` : idx}
            >
              <div className="flex size-12 md:size-16 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-card shadow-md transition-all duration-300 hover:border-sky-500/60 hover:shadow-[0_0_20px_rgba(0,141,228,0.35)]">
                {item.src ? (
                  <img
                    alt={item.name}
                    className={cn(
                      "pointer-events-auto size-5 select-none object-contain md:size-6",
                      item.isInvertable && "dark:invert",
                    )}
                    height="auto"
                    src={item.src}
                    width="auto"
                  />
                ) : item.name && !item.name.startsWith("Empty") ? (
                  <TechIcon name={item.name} size={22} className="pointer-events-auto size-5 select-none md:size-6" />
                ) : (
                  <div className="size-full rounded-full border border-dashed border-white/20 bg-transparent" />
                )}
              </div>
              {item.name && !item.name.startsWith("Empty") && (
                <span className="integrations-tooltip">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {buttonText && (
        <Link href={buttonHref}>
          <Button className="rounded-full px-6! py-3! font-semibold text-sm inline-flex items-center gap-2">
            {buttonText} <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Integrations;
