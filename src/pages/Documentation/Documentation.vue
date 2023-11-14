<template>
  <div class="row">
    <div class="col-4" />
    <div class="col-4">
      <h1>Documentation</h1>
      <p>
        Here lies a detailed explanation of how different aspects of the
        simulation work and the original documentation file of Mcroants
      </p>

      <hr />

      <br />

      <h2>INDEX</h2>

      <h4>Basics</h4>
      <p>Introduction</p>
      <p>Ants</p>
      <p>Consumables</p>

      <br />

      <h4>General Information</h4>
      <p>Inspection & Analysis</p>
      <p>Universe Values</p>

      <br />

      <h4>Ant/Ant Eater Behavior</h4>
      <p>Value Definition</p>
      <p>Ant Movement</p>
      <p>Ant Eater Movement</p>
      <p>Ant Genes/Alleles</p>

      <h5>Ant Relations</h5>

      <p>Breeding</p>
      <p>Sharing</p>
      <p>Fighting</p>

      <br />

      <h4>References & Credits</h4>

      <br />

      <hr />

      <br />
      <br />

      <h2>Basics</h2>

      <br />

      <h4>Introduction</h4>

      <br />

      <p>
        Mcroants is a simulator that has as a main objective to teach and prove
        to its users about how the studies of Genetics work, this is done via a
        simulation, completly controlable by the user, that simulates an
        ecosystem formed of ants, consumables & ant eaters (ant eaters eat ants,
        ants eat consumables, consumables are generated automaticaly).
      </p>

      <br />

      <h4>Ants</h4>
      <p>
        They are the main analyzable critters of the simulation, being the only
        to have simulated genes and complex relations, such as breeding &
        fighting.
      </p>
      <p>
        Ants will be divided into two species (red ants & black ants), the
        fittest ants will be able to survive longer and therefore, reproduce,
        which will make their alleles more common, making the next generation of
        ants more fit than the last, and so on.
      </p>

      <br />

      <h4>Consumables</h4>
      <p>
        Those are diffent things an ant might consume by walking on it, there
        are 2 types of consumables, which are foods and poison:
      </p>
      <p>Foods will raise the ant's food level by a certain value;</p>
      <p>
        Poison will kill the ant (ants without a poison recognition allele will
        think poison is food and go towards it);
      </p>

      <br />

      <hr />

      <br />

      <h2>General Information</h2>

      <br />

      <h4>Inspection & Analysis</h4>

      <br />

      <p>
        Many tools are available for you to inspect and analyze the current
        simulation:
      </p>

      <p>
        World Options Tracker: Shows you the current simulation's rules and
        operations (The World Options Tracker is shown at the top-left of the
        page);
      </p>

      <p>
        Universal Values Tracker: Shows you the current simulation's universal
        values (The Universal Values Tracker is shown at the top-right of the
        page);
      </p>

      <p>
        Simulation Canvas: Shows what is happening on the simulation, from
        consumables, to ants, ant eaters and their relations (The Simualtion
        Canvas is shown at the middle of the page):
      </p>

      <p>Foods are represented by yellow pixels;</p>

      <p>Poisons are represented by lime pixels;</p>

      <p>Red Ants are represented by red pixels;</p>

      <p>Black Ants are represented by white pixels;</p>

      <p>Ant Eaters are represented by purple pixels;</p>

      <canvas id="documentationCanvas" :width="600" :height="100" />

      <p>
        Ant Tracker: You may see all of an ant's statistics, and even color it
        to keep track of its position (The Ant Tracker is shown at the bottom of
        the page);
      </p>

      <br />

      <h4>Universe Values</h4>

      <br />

      <p>
        There are some values that will count certain events or aspects of the
        simulation:
      </p>

      <p>Food Eaten;</p>

      <p>Poison Eaten;</p>

      <p>Ant Deaths;</p>

      <p>Ant Kills;</p>

      <p>Breedings Occurred;</p>

      <p>Food Levels Shared;</p>

      <p>Fights Occurred;</p>

      <p>Ants Eaten;</p>

      <p>You may find this data in UNIVERSE STATUS at the top of the page</p>

      <br />

      <h4>Hall of Fame</h4>

      <br />

      <p>
        In the Hall of Fame, ants will be ranked according to different
        statistics they've achived (both living and dead ants will count towards
        these lists):
      </p>

      <p>Best Ants;</p>

      <p>Most Food Levels (at once);</p>

      <p>Longest Life;</p>

      <p>Most Breedings;</p>

      <p>Most Kills;</p>

      <br />

      <hr />

      <br />

      <h2>Ant Behavior</h2>

      <br />

      <h4>Value Definition</h4>

      <br />

      <p>
        An ant will have many values that define and are defined by their
        current and past behaviors:
      </p>
      <p>Id: Identifier for the ant;</p>
      <p>
        Position: [X, Y] Defines the ant's postion on the grid, being X the
        horizontal distance of the left border and Y the vertical distance from
        the top border;
      </p>
      <p>
        Food Level: A timer for the ant's lifespan, eating food will raise it
        (ants spend 1 food level per cycle, once it reaches 0, the ant dies);
      </p>
      <p>
        Type: Identifies some of the ant's relations with other ants (consider
        it as different species, not as a color difference);
      </p>
      <p>
        Cromossomes: Defines ant's main behavioral aspects, being 2 pairs of
        sequences of values that form the ant's phenotype (the actual behavior
        of the ant) - there is more information on the Genes/Alleles part of the
        documentation;
      </p>
      <p>Alive: Ant's current living status;</p>
      <p>Direction: The direction the ant will move if nothing changes;</p>
      <p>Age: The ant's age (in cycles);</p>
      <p>BirthCycle: The birth cycle of the ant;</p>
      <p>DeathCycle: The death cycle of the ant;</p>
      <p>
        Generation: How far this family of ants has gone (will be the result of
        the highest parent ant's generation value +1);
      </p>
      <p>
        FirstParentId: The ID of the ant's first parent (-1 refers to ants that
        spawned when the simulation started);
      </p>
      <p>
        SecondParentId: The ID of the ant's second parent (-1 refers to ants
        that spawned when the simulation started);
      </p>
      <p>Kills: The number of ants killed by this ant;</p>
      <p>Breedings: The number of breedings that happened with this ant;</p>
      <p>
        Most Food Levels: The highest number of food levels this ant ever had;
      </p>

      <br />

      <p>
        An ant eater will have some values that define their next behaviors,
        being a lot simpler than ants:
      </p>

      <p>Id: Identifier for the ant eater;</p>
      <p>
        Position: [X, Y] Defines the ant eaters's postion on the grid, being X
        the horizontal distance of the left border and Y the vertical distance
        from the top border;
      </p>
      <p>
        Current Energy: A timer for the ant eaters's movement, moving will
        consume 1 of the energy counter, if the counter is 0 or less, the ant
        eater will have to wait before moving again, giving time for close ants
        to escape;
      </p>

      <br />

      <h4>Movement</h4>
      <p>
        Many diffent factors affect ant movement, such as consumables, other
        ants & ant eaters, so this section is divided into 2 parts, the
        exploration part (for handling non special movement cases) and the
        non-exploration part (for handling special movement cases)
      </p>

      <br />

      <h5>EXPLORATION</h5>
      <p>
        Ants may enter exploration mode by eating foods or interacting with
        other ants
      </p>
      <p>
        In exploration mode, they will firstly start moving to the direction
        told by their alleles, and won't change unless they see a consumable, in
        which case the ant will enter the non-exploration mode
      </p>

      <br />

      <h5>NON-EXPLORATION</h5>
      <p>
        Ants may enter non-exploration mode by seeing possible mates, or
        consumables (depending on their poison sight allele)
      </p>
      <p>
        If the ant saw a possible mate or a consumable considered eatable, it
        will try to move towards it, and will continue doing that unless a
        closer or more important incentive appears or if, in the possible mate
        case, the ants are already one tile appart and one of the ants is going
        toward the other, in which case the ant will just stop and wait for the
        mate
      </p>
      <p>
        If the ant saw poison and can identify it (otherwise it will just
        consider it as a eatable consumable), it will disregard looking more
        towards the poison and will ignore it, unless the ant is going towards
        it, in which case it will try turning clockwise, until it has a place to
        go, unless there is none, in which case the ant will just move into the
        poison because it is trapped
      </p>

      <br />

      <h5>EXAMPLES</h5>

      <p>
        Following, there will be a few images describing situations the ant
        might find themselves in
      </p>

      <p>
        Consider blue pixels the simulation's borders or something the wants to
        avoid (like poison)
      </p>

      <p>
        Consider white pixels as the main ant & red pixels as secondary ants (of
        a different species than the main one, meaning they can't reproduce and
        aren't attracted to each other);
      </p>

      <p>Consider lime pixels as poison & purple pixels as anteaters</p>

      <br />

      <div class="row">
        <div class="col-6">
          <h5>Ant Obstacle Reaction</h5>
          <p>
            Gray pixels represent where the ant was in the last cycles, being
            darker the older the simulation, describing its movement
          </p>
          <p>The arrows represent the new direction the ant will try to move</p>

          <br />
          <br />

          <img
            src="../../assets/Ant-Wall-Movement.png"
            alt="Ant Food Blocking Relations"
            width="250px"
          />
        </div>
        <div class="col-6">
          <h5>Ant Vision Situations</h5>
          <p>
            The eye sybol represents either or not the ant can see the left-most
            entity/consumable, through the middle one
          </p>
          <p>
            The big colored pixel represents the element identified by the ant,
            and the ant will react according to what it saw
          </p>
          <p>
            The green arrow represents the order the ant sees the elements, and
            it will react to one or another element, depending on what is higher
            on its priority list (given by its alleles)
          </p>

          <br />
          <br />

          <img
            src="../../assets/Ant-FoodBlocking-Relations.png"
            alt="Ant Wall Movement"
            width="250px"
          />
        </div>
      </div>

      <br />
      <br />

      <h4>Genes/Alleles</h4>

      <br />

      <p>
        The genes/alleles of an ant will define their behaviors and
        characteristics, and will be carried through breeding (unless a mutation
        happens, in which case the allele will just be converted into a new
        random value):
      </p>

      <br />

      <h5>GENE 1: VISION</h5>

      <p>0 - ant is blind</p>
      <p>1 - ant can see 1 square away</p>
      <p>2 - ant can see 2 squares away</p>
      <p>and so on, until 15</p>

      <br />

      <h5>GENE 2: EXPLORATION</h5>

      <p>0 - ant will not move</p>
      <p>1 - ant moves up and down</p>
      <p>2 - ant moves right and left</p>
      <p>3 - ant moves in a random direction</p>

      <br />

      <h5>GENE 3: POISON IDENTIFICATION</h5>

      <p>0 - ant will not avoid poison</p>
      <p>1 - ant will avoid poison</p>

      <br />

      <h5>GENE 4: FOOD FOR MATING</h5>

      <p>0 - ant will mate if food level > 500</p>
      <p>1 - ant will mate if food level > 1000</p>

      <br />

      <h5>GENE 5: FOOD SHARING</h5>

      <p>0 - ant never shares its food</p>
      <p>1 - ant always shares its food</p>
      <p>2 - ant only shares its food if the other ant's 5 GENE == 2</p>
      <p>3 - ant only shares its food if the other ant's 5 GENE == 1 || 3</p>

      <br />

      <h5>GENE 6: ANT VISION</h5>

      <p>0 - ant CANNOT see other ants</p>
      <p>1 - ant CAN see other ants</p>

      <br />

      <h5>GENE 7: ANTEATER VISION</h5>

      <p>0 - ant CANNOT see an anteater</p>
      <p>1 - ant CAN see an anteater</p>

      <br />

      <h5>GENE 8: AGRESSION</h5>

      <p>0 - ant NEVER attacks</p>
      <p>1 - ant only attacks red ants</p>
      <p>2 - ant only attacks black ants</p>
      <p>3 - ant attacks both red & black ants</p>

      <br />

      <h5>GENE 9: STRENGTH</h5>

      <p>0 - strength = 1</p>
      <p>1 - strength = 2</p>
      <p>2 - strength = 3</p>

      <p>
        When calculating phenotype, highest numbered alleles are DOMINANT over
        lower numbered ones;
      </p>
      <br />
      <h4>Breeding</h4>
      <p>Breeding is one of the relations ants can have with other ants:</p>
      <p>
        Two ants will breed and try to aproach each other for breeding depending
        on their food levels and their GENE 4 allelic value.
      </p>
      <p>
        If the ants have success on breeding, they will lose 500 food levels and
        a baby ant will be generated, having one cromossome from each of their
        parents (picked at random from the two possibilities).
      </p>
      <br />
      <h4>Sharing</h4>
      <p>Breeding is one of the relations ants can have with other ants:</p>
      <p>
        Two ants will share depending on the relations between their GENE 5
        allelic values.
      </p>
      <p>
        If the ants have success on sharing, the hungriest ant will gain 10% of
        the fullest ant's food levels, and the fullest ant will lose those 10%.
      </p>
      <br />
      <h4>Fighting</h4>
      <p>Fighting is one of the relations ants can have with other ants:</p>
      <p>
        Two ants will share depending on the relations between their GENE 8
        allelic values & their species.
      </p>
      <p>
        If the ants fight, a value will be calculated to define the battle's
        winner, if there is one.
      </p>
      <p>
        The formula given for calculating an ant's performance in battle is the
        following:
      </p>
      <p>
        Ant Strength * (Random Value [0 to 1] * Ant Kills) + Ant Food Levels /
        10
      </p>
      <p>Ant Strength is given by the ant's 9 GENE</p>
      <p>
        Ant Kills is an internal value of an ant, as well as Ant Food Levels
      </p>
      <p>
        The ant with the highest performace value will only win if the
        difference between values is higher than the world's
        "minimumCombatPointDifference" value
      </p>

      <br />

      <hr />

      <br />

      <h2>References & Credits</h2>
      <p>Original concept and simulator by Stephen Wright (Mcroants 1992)</p>
      <p>Rework & Online Adaptation by Newton Alle (Mcroants 2023)</p>
      <!--<p>Original documentation file: <a href="">Mcroants.docs</a></p>-->
      <p>
        Plese remember that this is a solo project and that many glitches and
        bugs may be present, if you find any, please consider contacting me!
      </p>
      <br />
      <br />
      <p>Thanks for using Mcroants (2023)</p>
      <hr />
    </div>
  </div>
</template>
    

    <script>
export default {
  computed: {
    worldOptions() {
      return this.$store.getters.getWorldOptions;
    },
  },

  mounted() {
    var canvas = document.getElementById("documentationCanvas");

    if (!canvas) {
      return;
    }

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = this.worldOptions.consumables.foods.color;
    ctx.fillRect(25, 10, 50, 50);

    ctx.fillStyle = this.worldOptions.consumables.poisons.color;
    ctx.fillRect(125, 10, 50, 50);

    ctx.fillStyle = this.worldOptions.ants.redAnts.color;
    ctx.fillRect(225, 10, 50, 50);

    ctx.fillStyle = this.worldOptions.ants.blackAnts.color;
    ctx.fillRect(325, 10, 50, 50);

    ctx.fillStyle = this.worldOptions.antEaters.color;
    ctx.fillRect(425, 10, 50, 50);
  },
};
</script>