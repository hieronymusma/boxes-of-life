const LIFESPAN = 90;

export class BirthdayLifetimeSpan {
    birthday: Date;
    lifetime: number;

    constructor(birthday: Date, lifetime: number) {
        if (lifetime < this.calculateAge(birthday)) {
            throw Error("Lifetime is shorter than current age.");
        }

        this.birthday = birthday;
        this.lifetime = lifetime;
    }

    public updateDate(newDate: Date) {
        this.birthday = newDate;
    }

    static default(): BirthdayLifetimeSpan {
        return new BirthdayLifetimeSpan(new Date(), LIFESPAN);
    }

    private calculateAge(birthday: Date): number {
        var ageDiff = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}