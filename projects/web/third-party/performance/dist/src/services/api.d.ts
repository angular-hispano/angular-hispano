/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare type EntryType = 'mark' | 'measure' | 'paint' | 'resource' | 'frame' | 'navigation';
/**
 * This class holds a reference to various browser related objects injected by set methods.
 */
export declare class Api {
    performance: Performance;
    PerformanceObserver: any;
    windowLocation: Location;
    onFirstInputDelay?: Function;
    localStorage: Storage;
    document: Document;
    navigator: Navigator;
    constructor();
    setPerformance(perf: Performance): void;
    setPerformanceObserver(performanceObserver: any): void;
    setWindowLocation(location: Location): void;
    getUrl(): string | undefined;
    mark(name: string): void;
    measure(measureName: string, mark1: string, mark2: string): void;
    getEntriesByType(type: string): PerformanceEntry[];
    getEntriesByName(name: string): PerformanceEntry[];
    getTimeOrigin(): number;
    setupObserver(entryType: any, callback: any): void;
    static getInstance(): Api;
}
export declare function setupApi(window: any): void;
