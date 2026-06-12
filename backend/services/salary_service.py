import random
import numpy as np

POP_SIZE = 20
GENERATIONS = 30
MUTATION_RATE = 0.1
BUDGET_LIMIT = 2000000  # adjust based on dataset


def fitness(employees, chromosome):
    total_cost = 0
    score = 0

    for i, emp in enumerate(employees):
        base = emp["salary"]
        adjustment = chromosome[i]

        new_salary = base * (1 + adjustment)
        total_cost += new_salary

        # reward logic
        performance = emp["performance_score"]
        satisfaction = emp["satisfaction"]

        score += (performance * adjustment * 10)
        score -= (1 - satisfaction) * 20

    # budget penalty
    if total_cost > BUDGET_LIMIT:
        score -= 10000

    return score


def create_chromosome(n):
    return [random.uniform(0.0, 0.15) for _ in range(n)]


def crossover(parent1, parent2):
    point = random.randint(0, len(parent1) - 1)
    return parent1[:point] + parent2[point:]


def mutate(chromosome):
    for i in range(len(chromosome)):
        if random.random() < MUTATION_RATE:
            chromosome[i] = random.uniform(0.0, 0.2)
    return chromosome


def get_salary_recommendations(employees):
    population = [create_chromosome(len(employees)) for _ in range(POP_SIZE)]

    for _ in range(GENERATIONS):
        population = sorted(
            population,
            key=lambda c: fitness(employees, c),
            reverse=True
        )

        new_population = population[:5]  # elitism

        while len(new_population) < POP_SIZE:
            p1 = random.choice(population[:10])
            p2 = random.choice(population[:10])

            child = crossover(p1, p2)
            child = mutate(child)

            new_population.append(child)

        population = new_population

    best = max(population, key=lambda c: fitness(employees, c))
    return best