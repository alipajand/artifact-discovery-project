import { Artifact, ArtifactDiscovery, potteryPercentages } from './potteryPercentages';

describe('potteryPercentages', () => {
    test('should calculate pottery percentages correctly for a specific scenario', () => {
        const discoveries: ArtifactDiscovery[] = [
            {
                "discovery_date": "May 15th 2023 at 10:00 UTC",
                "dig_site": 9,
                "artifact": { isPottery: true }
            },
            {
                "discovery_date": "May 15th 2023 at 11:00 UTC",
                "dig_site": 9,
                "artifact": { isPottery: false }
            },
            {
                "discovery_date": "May 15th 2023 at 12:00 UTC",
                "dig_site": 9,
                "artifact": { isPottery: true }
            },
            {
                "discovery_date": "May 15th 2023 at 13:00 UTC",
                "dig_site": 9,
                "artifact": { isPottery: true }
            },
            {
                "discovery_date": "May 15th 2023 at 14:00 UTC",
                "dig_site": 9,
                "artifact": { isPottery: false }
            },
        ];

        const consoleLogMock = jest.spyOn(console, 'log');
        consoleLogMock.mockImplementation(() => {});

        potteryPercentages(discoveries);

        expect(consoleLogMock).toHaveBeenCalledWith('On May, dig site 9 had 60% of its discoveries as pottery.');

        consoleLogMock.mockRestore();
    });
});

describe('Artifact and ArtifactDiscovery', () => {
    test('Artifact constructor should set isPottery correctly', () => {
        const potteryArtifact = new Artifact(true);
        expect(potteryArtifact.isPottery).toBe(true);

        const nonPotteryArtifact = new Artifact(false);
        expect(nonPotteryArtifact.isPottery).toBe(false);
    });

    test('ArtifactDiscovery constructor should set properties correctly', () => {
        const discovery = new ArtifactDiscovery('May 12th 2023 at 10:15 UTC', 7, new Artifact(false));

        expect(discovery.discovery_date).toBe('May 12th 2023 at 10:15 UTC');
        expect(discovery.dig_site).toBe(7);
        expect(discovery.artifact.isPottery).toBe(false);
    });
});

describe('potteryPercentages', () => {
    test('should calculate pottery percentages correctly', () => {
        const discoveries: ArtifactDiscovery[] = [
            {
                "discovery_date": "May 12th 2023 at 10:15 UTC",
                "dig_site": 7,
                "artifact": { isPottery: false }
            },
        ];

        const spy = jest.spyOn(console, 'log');

        potteryPercentages(discoveries);

        spy.mockRestore();
    });
});
