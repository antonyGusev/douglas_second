import {
  Page,
  ElementHandle,
  Browser,
  BrowserContext,
  Locator,
  chromium,
  firefox,
  webkit,
  Cookie,
  APIRequest,
  APIResponse,
  request,
  Mouse,
  devices,
  ViewportSize,
} from 'playwright';
import { test, TestInfo, defineConfig, PlaywrightTestConfig } from '@playwright/test';

export interface IPage extends Page {}
export interface IElementHandle extends ElementHandle {}
export interface IBrowser extends Browser {}
export interface IBrowserContext extends BrowserContext {}
export interface ILocator extends Locator {}
export interface IMouse extends Mouse {}
export interface ICookie extends Cookie {}
export interface IAPIRequest extends APIRequest {}
export interface IAPIResponse extends APIResponse {}
export interface ITestInfo extends TestInfo {}
export interface IPlaywrightTestConfig extends PlaywrightTestConfig {}
export interface IViewportSize extends ViewportSize {}

export { chromium, firefox, webkit, request, devices, test, defineConfig };
