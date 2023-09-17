export class Artifact {
    isPottery: boolean;

    constructor(isPottery: boolean) {
        this.isPottery = isPottery;
    }
}

export class ArtifactDiscovery {
    artifact: Artifact;
    dig_site: number;
    discovery_date: string;

    constructor(discovery_date: string, dig_site: number, artifact: Artifact) {
        this.dig_site = dig_site;
        this.artifact = artifact;
        this.discovery_date = discovery_date;
    }
}

export function potteryPercentages(items: ArtifactDiscovery[]) {
    const percentagesMap: Map<string, Map<number, { potteryCount: number, totalCount: number }>> = new Map();

    for (const item of items) {
        const { discovery_date, dig_site, artifact } = item;
        const dateKey = discovery_date.split(' ')[0];

        if (!percentagesMap.has(dateKey)) {
            percentagesMap.set(dateKey, new Map());
        }

        if (!percentagesMap.get(dateKey)!.has(dig_site)) {
            percentagesMap.get(dateKey)!.set(dig_site, { potteryCount: 0, totalCount: 0 });
        }

        const siteData = percentagesMap.get(dateKey)!.get(dig_site)!;
        siteData.totalCount++;
        if (artifact.isPottery) {
            siteData.potteryCount++;
        }
    }

    percentagesMap.forEach((siteMap, date) => {
        siteMap.forEach((data, site) => {
            const potteryPercentage = (data.potteryCount / data.totalCount) * 100;
            console.log(`On ${date}, dig site ${site} had ${potteryPercentage.toFixed(0)}% of its discoveries as pottery.`);
        });
    });
}
